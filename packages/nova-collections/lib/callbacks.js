import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Collections from "./collection.js";

// generate slug on insert
Collections.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  var slug = !!doc.slug ? doc.slug : Telescope.utils.slugify(doc.name);
  doc.slug = Telescope.utils.getUnusedSlug(Collections, slug);
});

// generate slug on edit, if it has changed
Collections.before.update(function (userId, doc, fieldNames, modifier) {
  if (modifier.$set && modifier.$set.slug && modifier.$set.slug !== doc.slug) {
    modifier.$set.slug = Telescope.utils.getUnusedSlug(Collections, modifier.$set.slug);
  }
});

// add callback that adds collections CSS classes
function addCategoryClass (postClass, post) {
  var classArray = _.map(Posts.getCollections(post), function (collection){return "collection-"+collection.slug;});
  return postClass + " " + classArray.join(' ');
}
Telescope.callbacks.add("postClass", addCategoryClass);

// ------- Collections Check -------- //

// make sure all collections in the post.collections array exist in the db
var checkCollections = function (post) {

  // if there are no collections, stop here
  if (!post.collections || post.collections.length === 0) {
    return;
  }

  // check how many of the collections given also exist in the db
  var collectionCount = Collections.find({_id: {$in: post.collections}}).count();

  if (post.collections.length !== collectionCount) {
    throw new Meteor.Error('invalid_collection', 'invalid_collection');
  }
};

function postsNewCheckCollections (post) {
  checkCollections(post);
  return post;
}
Telescope.callbacks.add("posts.new.sync", postsNewCheckCollections);

function postEditCheckCollections (post) {
  checkCollections(post);
  return post;
}
Telescope.callbacks.add("posts.edit.sync", postEditCheckCollections);

// TODO: debug this

// function addParentCollectionsOnSubmit (post) {
//   var collections = post.collections;
//   var newCollections = [];
//   if (collections) {
//     collections.forEach(function (collectionId) {
//       var collection = Collections.findOne(collectionId);
//       newCollections = newCollections.concat(_.pluck(collection.getParents().reverse(), "_id"));
//       newCollections.push(collection._id);
//     });
//   }
//   post.collections = _.unique(newCollections);
//   return post;
// }
// Telescope.callbacks.add("posts.new.sync", addParentCollectionsOnSubmit);

// function addParentCollectionsOnEdit (modifier, post) {
//   if (modifier.$unset && modifier.$unset.collections !== undefined) {
//     return modifier;
//   }

//   var collections = modifier.$set.collections;
//   var newCollections = [];
//   if (collections) {
//     collections.forEach(function (collectionId) {
//       var collection = Collections.findOne(collectionId);
//       newCollections = newCollections.concat(_.pluck(collection.getParents().reverse(), "_id"));
//       newCollections.push(collection._id);
//     });
//   }
//   modifier.$set.collections = _.unique(newCollections);
//   return modifier;
// }
// Telescope.callbacks.add("posts.edit.sync", addParentCollectionsOnEdit);
