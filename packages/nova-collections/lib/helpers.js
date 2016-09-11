import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Collections from "./collection.js";

Collections.helpers({getCollection: () => Collections});
Collections.helpers({getCollectionName: () => "collections"});

///**
// * @summary Get all of a collection's parents
// * @param {Object} collection
// */
//Collections.getParents = function (collection) {
//  var collectionsArray = [];
//
//  var getParents = function recurse (collection) {
//    var parent;
//    if (parent = Collections.findOne(collection.parentId)) {
//      collectionsArray.push(parent);
//      recurse(parent);
//    }
//  }(collection);
//
//  return collectionsArray;
//};
//Collections.helpers({getParents: function () {return Collections.getParents(this);}});

/**
 * @summary Get all of a collection's children
 * @param {Object} collection
 */
//Collections.getChildren = function (collection) {
//  var collectionsArray = [];
//
//  var getChildren = function recurse (collections) {
//    var children = Collections.find({parentId: {$in: _.pluck(collections, "_id")}}).fetch()
//    if (children.length > 0) {
//      collectionsArray = collectionsArray.concat(children);
//      recurse(children);
//    }
//  }([collection]);
//
//  return collectionsArray;
//};
//Collections.helpers({getChildren: function () {return Collections.getChildren(this);}});

/**
 * @summary Get all of a post's collections
 * @param {Object} post
 */
Posts.getCollections = function (post) {
  return !!post.collections ? Collections.find({_id: {$in: post.collections}}).fetch() : [];
};
Posts.helpers({getCollections: function () {return Posts.getCollections(this);}});

/**
 * @summary Get a collection's URL
 * @param {Object} collection
 */
Collections.getUrl = function (collection, isAbsolute) {
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0,-1) : "";
  // return prefix + FlowRouter.path("postsCategory", collection);
  return `${prefix}/?cat=${collection.slug}`;
};
Collections.helpers({getUrl: function () {return Collections.getUrl(this);}});

/**
 * @summary Get a collection's counter name
 * @param {Object} collection
 */
 Collections.getCounterName = function (collection) {
  return collection._id + "-postsCount";
 }
 Collections.helpers({getCounterName: function () {return Collections.getCounterName(this);}});
