import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Categories from "./collection.js";

Categories.helpers({getCollection: () => Categories});
Categories.helpers({getCollectionName: () => "tags"});

/**
 * @summary Get all of a category's parents
 * @param {Object} category
 */
Categories.getParents = function (category) {
  var tagsArray = [];

  var getParents = function recurse (category) {
    var parent;
    if (parent = Categories.findOne(category.parentId)) {
      tagsArray.push(parent);
      recurse(parent);
    }
  }(category);

  return tagsArray;
};
Categories.helpers({getParents: function () {return Categories.getParents(this);}});

/**
 * @summary Get all of a category's children
 * @param {Object} category
 */
Categories.getChildren = function (category) {
  var tagsArray = [];

  var getChildren = function recurse (tags) {
    var children = Categories.find({parentId: {$in: _.pluck(tags, "_id")}}).fetch()
    if (children.length > 0) {
      tagsArray = tagsArray.concat(children);
      recurse(children);
    }
  }([category]);

  return tagsArray;
};
Categories.helpers({getChildren: function () {return Categories.getChildren(this);}});

/**
 * @summary Get all of a post's tags
 * @param {Object} post
 */
Posts.getCategories = function (post) {
  return !!post.tags ? Categories.find({_id: {$in: post.tags}}).fetch() : [];
};
Posts.helpers({getCategories: function () {return Posts.getCategories(this);}});

/**
 * @summary Get a category's URL
 * @param {Object} category
 */
Categories.getUrl = function (category, isAbsolute) {
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0,-1) : "";
  // return prefix + FlowRouter.path("postsCategory", category);
  return `${prefix}/?cat=${category.slug}`;
};
Categories.helpers({getUrl: function () {return Categories.getUrl(this);}});

/**
 * @summary Get a category's counter name
 * @param {Object} category
 */
 Categories.getCounterName = function (category) {
  return category._id + "-postsCount";
 }
 Categories.helpers({getCounterName: function () {return Categories.getCounterName(this);}});
