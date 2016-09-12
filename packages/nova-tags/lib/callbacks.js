import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Tags from "./collection.js";

// generate slug on insert
Tags.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  var slug = !!doc.slug ? doc.slug : Telescope.utils.slugify(doc.name);
  doc.slug = Telescope.utils.getUnusedSlug(Tags, slug);
});

// generate slug on edit, if it has changed
Tags.before.update(function (userId, doc, fieldNames, modifier) {
  if (modifier.$set && modifier.$set.slug && modifier.$set.slug !== doc.slug) {
    modifier.$set.slug = Telescope.utils.getUnusedSlug(Tags, modifier.$set.slug);
  }
});

// add callback that adds tags CSS classes
function addTagClass (postClass, post) {
  var classArray = _.map(Posts.getTags(post), function (tag){return "tag-"+tag.slug;});
  return postClass + " " + classArray.join(' ');
}
Telescope.callbacks.add("postClass", addTagClass);

// ------- Tags Check -------- //

// make sure all tags in the post.tags array exist in the db
var checkTags = function (post) {

  // if there are no tags, stop here
  if (!post.tags || post.tags.length === 0) {
    return;
  }

  // check how many of the tags given also exist in the db
  var tagCount = Tags.find({_id: {$in: post.tags}}).count();

  if (post.tags.length !== tagCount) {
    throw new Meteor.Error('invalid_tag', 'invalid_tag');
  }
};

function postsNewCheckTags (post) {
  checkTags(post);
  return post;
}
Telescope.callbacks.add("posts.new.sync", postsNewCheckTags);

function postEditCheckTags (post) {
  checkTags(post);
  return post;
}
Telescope.callbacks.add("posts.edit.sync", postEditCheckTags);
