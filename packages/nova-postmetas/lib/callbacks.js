import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import PostMetas from "./collection.js";

// generate slug on insert
PostMetas.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  var slug = !!doc.slug ? doc.slug : Telescope.utils.slugify(doc.name);
  doc.slug = Telescope.utils.getUnusedSlug(PostMetas, slug);
});

// generate slug on edit, if it has changed
PostMetas.before.update(function (userId, doc, fieldNames, modifier) {
  if (modifier.$set && modifier.$set.slug && modifier.$set.slug !== doc.slug) {
    modifier.$set.slug = Telescope.utils.getUnusedSlug(PostMetas, modifier.$set.slug);
  }
});

// add callback that adds postmetas CSS classes
function addPostMetaClass (postClass, post) {
  var classArray = _.map(Posts.getPostMetas(post), function (postmeta){return "postmeta-"+postmeta.slug;});
  return postClass + " " + classArray.join(' ');
}
Telescope.callbacks.add("postClass", addPostMetaClass);

// ------- PostMetas Check -------- //

// make sure all postmetas in the post.postmetas array exist in the db
var checkPostMetas = function (post) {

  // if there are no postmetas, stop here
  if (!post.postmetas || post.postmetas.length === 0) {
    return;
  }

  // check how many of the postmetas given also exist in the db
  var postmetaCount = PostMetas.find({_id: {$in: post.postmetas}}).count();

  if (post.postmetas.length !== postmetaCount) {
    throw new Meteor.Error('invalid_postmeta', 'invalid_postmeta');
  }
};

function postsNewCheckPostMetas (post) {
  checkPostMetas(post);
  return post;
}
Telescope.callbacks.add("posts.new.sync", postsNewCheckPostMetas);

function postEditCheckPostMetas (post) {
  checkPostMetas(post);
  return post;
}
Telescope.callbacks.add("posts.edit.sync", postEditCheckPostMetas);
