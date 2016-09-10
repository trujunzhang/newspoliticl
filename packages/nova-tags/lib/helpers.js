import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Tags from "./collection.js";

Tags.helpers({getCollection: () => Tags});
Tags.helpers({getCollectionName: () => "tags"});

/**
 * @summary Get all of a tag's parents
 * @param {Object} tag
 */
Tags.getParents = function (tag) {
  var tagsArray = [];

  var getParents = function recurse (tag) {
    var parent;
    if (parent = Tags.findOne(tag.parentId)) {
      tagsArray.push(parent);
      recurse(parent);
    }
  }(tag);

  return tagsArray;
};
Tags.helpers({getParents: function () {return Tags.getParents(this);}});

/**
 * @summary Get all of a tag's children
 * @param {Object} tag
 */
Tags.getChildren = function (tag) {
  var tagsArray = [];

  var getChildren = function recurse (tags) {
    var children = Tags.find({parentId: {$in: _.pluck(tags, "_id")}}).fetch()
    if (children.length > 0) {
      tagsArray = tagsArray.concat(children);
      recurse(children);
    }
  }([tag]);

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
 * @summary Get a tag's URL
 * @param {Object} tag
 */
Tags.getUrl = function (tag, isAbsolute) {
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0,-1) : "";
  // return prefix + FlowRouter.path("postsTag", tag);
  return `${prefix}/?cat=${tag.slug}`;
};
Tags.helpers({getUrl: function () {return Tags.getUrl(this);}});

/**
 * @summary Get a tag's counter name
 * @param {Object} tag
 */
 Tags.getCounterName = function (tag) {
  return tag._id + "-postsCount";
 }
 Tags.helpers({getCounterName: function () {return Tags.getCounterName(this);}});
