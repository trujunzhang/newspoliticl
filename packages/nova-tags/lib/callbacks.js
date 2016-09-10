import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Categories from "./collection.js";

// generate slug on insert
Categories.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  var slug = !!doc.slug ? doc.slug : Telescope.utils.slugify(doc.name);
  doc.slug = Telescope.utils.getUnusedSlug(Categories, slug);
});

// generate slug on edit, if it has changed
Categories.before.update(function (userId, doc, fieldNames, modifier) {
  if (modifier.$set && modifier.$set.slug && modifier.$set.slug !== doc.slug) {
    modifier.$set.slug = Telescope.utils.getUnusedSlug(Categories, modifier.$set.slug);
  }
});

// add callback that adds tags CSS classes
function addCategoryClass (postClass, post) {
  var classArray = _.map(Posts.getCategories(post), function (category){return "category-"+category.slug;});
  return postClass + " " + classArray.join(' ');
}
Telescope.callbacks.add("postClass", addCategoryClass);

// ------- Categories Check -------- //

// make sure all tags in the post.tags array exist in the db
var checkCategories = function (post) {

  // if there are no tags, stop here
  if (!post.tags || post.tags.length === 0) {
    return;
  }

  // check how many of the tags given also exist in the db
  var categoryCount = Categories.find({_id: {$in: post.tags}}).count();

  if (post.tags.length !== categoryCount) {
    throw new Meteor.Error('invalid_category', 'invalid_category');
  }
};

function postsNewCheckCategories (post) {
  checkCategories(post);
  return post;
}
Telescope.callbacks.add("posts.new.sync", postsNewCheckCategories);

function postEditCheckCategories (post) {
  checkCategories(post);
  return post;
}
Telescope.callbacks.add("posts.edit.sync", postEditCheckCategories);

// TODO: debug this

// function addParentCategoriesOnSubmit (post) {
//   var tags = post.tags;
//   var newCategories = [];
//   if (tags) {
//     tags.forEach(function (categoryId) {
//       var category = Categories.findOne(categoryId);
//       newCategories = newCategories.concat(_.pluck(category.getParents().reverse(), "_id"));
//       newCategories.push(category._id);
//     });
//   }
//   post.tags = _.unique(newCategories);
//   return post;
// }
// Telescope.callbacks.add("posts.new.sync", addParentCategoriesOnSubmit);

// function addParentCategoriesOnEdit (modifier, post) {
//   if (modifier.$unset && modifier.$unset.tags !== undefined) {
//     return modifier;
//   }

//   var tags = modifier.$set.tags;
//   var newCategories = [];
//   if (tags) {
//     tags.forEach(function (categoryId) {
//       var category = Categories.findOne(categoryId);
//       newCategories = newCategories.concat(_.pluck(category.getParents().reverse(), "_id"));
//       newCategories.push(category._id);
//     });
//   }
//   modifier.$set.tags = _.unique(newCategories);
//   return modifier;
// }
// Telescope.callbacks.add("posts.edit.sync", addParentCategoriesOnEdit);
