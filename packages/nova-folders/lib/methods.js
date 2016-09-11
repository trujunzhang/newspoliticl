import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Folders from "./collection.js";

Meteor.methods({
  "folders.deleteById": function (folderId) {
    
    check(folderId, String);
    
    const currentUser = this.userId && Users.findOne(this.userId);

    if (Users.canDo(currentUser, "folders.remove.all")) {

      // delete folder
      Folders.remove(folderId);

      // find any direct children of this folder and make them root folders
      //Folders.find({parentId: folderId}).forEach(function (folder) {
      //  Folders.update(folder._id, {$unset: {parentId: ""}});
      //});

      // find any posts with this folder and remove it
      var postsUpdated = Posts.update({folders: {$in: [folderId]}}, {$pull: {folders: folderId}}, {multi: true});

      return postsUpdated;

    }
  }
});

Folders.smartMethods({
  createName: "folders.new",
  editName: "folders.edit"
});