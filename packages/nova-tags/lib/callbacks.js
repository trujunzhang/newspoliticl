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
function addCategoryClass (postClass, post) {
  var classArray = _.map(Posts.getTags(post), function (category){return "category-"+category.slug;});
  return postClass + " " + classArray.join(' ');
}
Telescope.callbacks.add("postClass", addCategoryClass);

// ------- Tags Check -------- //

// make sure all tags in the post.tags array exist in the db
var checkTags = function (post) {

  // if there are no tags, stop here
  if (!post.tags || post.tags.length === 0) {
    return;
  }

  // check how many of the tags given also exist in the db
  var categoryCount = Tags.find({_id: {$in: post.tags}}).count();

  if (post.tags.length !== categoryCount) {
    throw new Meteor.Error('invalid_category', 'invalid_category');
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

// TODO: debug this

// function addParentTagsOnSubmit (post) {
//   var tags = post.tags;
//   var newTags = [];
//   if (tags) {
//     tags.forEach(function (categoryId) {
//       var category = Tags.findOne(categoryId);
//       newTags = newTags.concat(_.pluck(category.getParents().reverse(), "_id"));
//       newTags.push(category._id);
//     });
//   }
//   post.tags = _.unique(newTags);
//   return post;
// }
// Telescope.callbacks.add("posts.new.sync", addParentTagsOnSubmit);

// function addParentTagsOnEdit (modifier, post) {
//   if (modifier.$unset && modifier.$unset.tags !== undefined) {
//     return modifier;
//   }

//   var tags = modifier.$set.tags;
//   var newTags = [];
//   if (tags) {
//     tags.forEach(function (categoryId) {
//       var category = Tags.findOne(categoryId);
//       newTags = newTags.concat(_.pluck(category.getParents().reverse(), "_id"));
//       newTags.push(category._id);
//     });
//   }
//   modifier.$set.tags = _.unique(newTags);
//   return modifier;
// }
// Telescope.callbacks.add("posts.edit.sync", addParentTagsOnEdit);
