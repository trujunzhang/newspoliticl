import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Folders from "./collection.js";

// generate slug on insert
Folders.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  var slug = !!doc.slug ? doc.slug : Telescope.utils.slugify(doc.name);
  doc.slug = Telescope.utils.getUnusedSlug(Folders, slug);
});

// generate slug on edit, if it has changed
Folders.before.update(function (userId, doc, fieldNames, modifier) {
  if (modifier.$set && modifier.$set.slug && modifier.$set.slug !== doc.slug) {
    modifier.$set.slug = Telescope.utils.getUnusedSlug(Folders, modifier.$set.slug);
  }
});

// add callback that adds folders CSS classes
function addFolderClass (postClass, post) {
  var classArray = _.map(Posts.getFolders(post), function (folder){return "folder-"+folder.slug;});
  return postClass + " " + classArray.join(' ');
}
Telescope.callbacks.add("postClass", addFolderClass);

// ------- Folders Check -------- //

// make sure all folders in the post.folders array exist in the db
var checkFolders = function (post) {

  // if there are no folders, stop here
  if (!post.folders || post.folders.length === 0) {
    return;
  }

  // check how many of the folders given also exist in the db
  var folderCount = Folders.find({_id: {$in: post.folders}}).count();

  if (post.folders.length !== folderCount) {
    throw new Meteor.Error('invalid_folder', 'invalid_folder');
  }
};

function postsNewCheckFolders (post) {
  checkFolders(post);
  return post;
}
Telescope.callbacks.add("posts.new.sync", postsNewCheckFolders);

function postEditCheckFolders (post) {
  checkFolders(post);
  return post;
}
Telescope.callbacks.add("posts.edit.sync", postEditCheckFolders);

// TODO: debug this

// function addParentFoldersOnSubmit (post) {
//   var folders = post.folders;
//   var newFolders = [];
//   if (folders) {
//     folders.forEach(function (folderId) {
//       var folder = Folders.findOne(folderId);
//       newFolders = newFolders.concat(_.pluck(folder.getParents().reverse(), "_id"));
//       newFolders.push(folder._id);
//     });
//   }
//   post.folders = _.unique(newFolders);
//   return post;
// }
// Telescope.callbacks.add("posts.new.sync", addParentFoldersOnSubmit);

// function addParentFoldersOnEdit (modifier, post) {
//   if (modifier.$unset && modifier.$unset.folders !== undefined) {
//     return modifier;
//   }

//   var folders = modifier.$set.folders;
//   var newFolders = [];
//   if (folders) {
//     folders.forEach(function (folderId) {
//       var folder = Folders.findOne(folderId);
//       newFolders = newFolders.concat(_.pluck(folder.getParents().reverse(), "_id"));
//       newFolders.push(folder._id);
//     });
//   }
//   modifier.$set.folders = _.unique(newFolders);
//   return modifier;
// }
// Telescope.callbacks.add("posts.edit.sync", addParentFoldersOnEdit);
