import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import PostMetas from "./collection.js";

PostMetas.helpers({getCollection: () => PostMetas});
PostMetas.helpers({getCollectionName: () => "postmetas"});

/**
 * @summary Get all of a postmeta's parents
 * @param {Object} postmeta
 */
PostMetas.getParents = function (postmeta) {
  var postmetasArray = [];

  var getParents = function recurse (postmeta) {
    var parent;
    if (parent = PostMetas.findOne(postmeta.parentId)) {
      postmetasArray.push(parent);
      recurse(parent);
    }
  }(postmeta);

  return postmetasArray;
};
PostMetas.helpers({getParents: function () {return PostMetas.getParents(this);}});

/**
 * @summary Get all of a postmeta's children
 * @param {Object} postmeta
 */
PostMetas.getChildren = function (postmeta) {
  var postmetasArray = [];

  var getChildren = function recurse (postmetas) {
    var children = PostMetas.find({parentId: {$in: _.pluck(postmetas, "_id")}}).fetch()
    if (children.length > 0) {
      postmetasArray = postmetasArray.concat(children);
      recurse(children);
    }
  }([postmeta]);

  return postmetasArray;
};
PostMetas.helpers({getChildren: function () {return PostMetas.getChildren(this);}});

/**
 * @summary Get all of a post's postmetas
 * @param {Object} post
 */
Posts.getPostMetas = function (post) {
  return !!post.postmetas ? PostMetas.find({_id: {$in: post.postmetas}}).fetch() : [];
};
Posts.helpers({getPostMetas: function () {return Posts.getPostMetas(this);}});

/**
 * @summary Get a postmeta's URL
 * @param {Object} postmeta
 */
PostMetas.getUrl = function (postmeta, isAbsolute) {
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0,-1) : "";
  // return prefix + FlowRouter.path("postsPostMeta", postmeta);
  return `${prefix}/?postmeta=${postmeta.slug}`;
};
PostMetas.helpers({getUrl: function () {return PostMetas.getUrl(this);}});

/**
 * @summary Get a postmeta's counter name
 * @param {Object} postmeta
 */
 PostMetas.getCounterName = function (postmeta) {
  return postmeta._id + "-postsCount";
 }
 PostMetas.helpers({getCounterName: function () {return PostMetas.getCounterName(this);}});
