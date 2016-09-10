import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Tags from "./collection.js";

Tags.helpers({getCollection: () => Tags});
Tags.helpers({getCollectionName: () => "tags"});

/**
 * @summary Get all of a category's parents
 * @param {Object} category
 */
Tags.getParents = function (category) {
  var tagsArray = [];

  var getParents = function recurse (category) {
    var parent;
    if (parent = Tags.findOne(category.parentId)) {
      tagsArray.push(parent);
      recurse(parent);
    }
  }(category);

  return tagsArray;
};
Tags.helpers({getParents: function () {return Tags.getParents(this);}});

/**
 * @summary Get all of a category's children
 * @param {Object} category
 */
Tags.getChildren = function (category) {
  var tagsArray = [];

  var getChildren = function recurse (tags) {
    var children = Tags.find({parentId: {$in: _.pluck(tags, "_id")}}).fetch()
    if (children.length > 0) {
      tagsArray = tagsArray.concat(children);
      recurse(children);
    }
  }([category]);

  return tagsArray;
};
Tags.helpers({getChildren: function () {return Tags.getChildren(this);}});

/**
 * @summary Get all of a post's tags
 * @param {Object} post
 */
Posts.getTags = function (post) {
  return !!post.tags ? Tags.find({_id: {$in: post.tags}}).fetch() : [];
};
Posts.helpers({getTags: function () {return Posts.getTags(this);}});

/**
 * @summary Get a category's URL
 * @param {Object} category
 */
Tags.getUrl = function (category, isAbsolute) {
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0,-1) : "";
  // return prefix + FlowRouter.path("postsCategory", category);
  return `${prefix}/?cat=${category.slug}`;
};
Tags.helpers({getUrl: function () {return Tags.getUrl(this);}});

/**
 * @summary Get a category's counter name
 * @param {Object} category
 */
 Tags.getCounterName = function (category) {
  return category._id + "-postsCount";
 }
 Tags.helpers({getCounterName: function () {return Tags.getCounterName(this);}});
