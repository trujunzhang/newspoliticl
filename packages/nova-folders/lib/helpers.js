import Telescope from 'meteor/nova:lib';
import Users from "meteor/nova:users";
import Folders from "./collection.js";

Folders.helpers({getCollection: () => Folders});
Folders.helpers({getCollectionName: () => "folders"});

/**
 * @summary Get all of a folder's parents
 * @param {Object} folder
 */
Folders.getParents = function (folder) {
  var foldersArray = [];

  var getParents = function recurse (folder) {
    var parent;
    if (parent = Folders.findOne(folder.parentId)) {
      foldersArray.push(parent);
      recurse(parent);
    }
  }(folder);

  return foldersArray;
};
Folders.helpers({getParents: function () {return Folders.getParents(this);}});

/**
 * @summary Get all of a folder's children
 * @param {Object} folder
 */
Folders.getChildren = function (folder) {
  var foldersArray = [];

  var getChildren = function recurse (folders) {
    var children = Folders.find({parentId: {$in: _.pluck(folders, "_id")}}).fetch()
    if (children.length > 0) {
      foldersArray = foldersArray.concat(children);
      recurse(children);
    }
  }([folder]);

  return foldersArray;
};
Folders.helpers({getChildren: function () {return Folders.getChildren(this);}});

/**
 * @summary Get all of a post's folders
 * @param {Object} user
 */
Users.getFolders = function (user) {
  return !!user.folders ? Folders.find({_id: {$in: user.folders}}).fetch() : [];
};
Users.helpers({getFolders: function () {return Users.getFolders(this);}});

/**
 * @summary Get a folder's URL
 * @param {Object} folder
 */
Folders.getUrl = function (folder, isAbsolute) {
  var isAbsolute = typeof isAbsolute === "undefined" ? false : isAbsolute; // default to false
  var prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0,-1) : "";
  // return prefix + FlowRouter.path("postsFolder", folder);
  return `${prefix}/?cat=${folder.slug}`;
};
Folders.helpers({getUrl: function () {return Folders.getUrl(this);}});

/**
 * @summary Get a folder's counter name
 * @param {Object} folder
 */
 Folders.getCounterName = function (folder) {
  return folder._id + "-postsCount";
 }
 Folders.helpers({getCounterName: function () {return Folders.getCounterName(this);}});

