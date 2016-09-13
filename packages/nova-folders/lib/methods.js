import Users from 'meteor/nova:users';
import Folders from "./collection.js";

/**
 *
 * Folder Methods
 *
 */

Folders.methods = {};
/**
 * @summary Insert a folder in the database (note: optional folder properties not listed here)
 * @param {Object} folder - the folder being inserted
 * @param {string} folder.userId - the id of the user the folder belongs to
 * @param {string} folder.title - the folder's title
 */
Folders.methods.new = function (folder) {

    const currentUser = Meteor.users.findOne(folder.userId);

    folder = Telescope.callbacks.run("folders.new.sync", folder, currentUser);

    folder._id = Folders.insert(folder);

    // note: query for folder to get fresh document with collection-hooks effects applied
    Telescope.callbacks.runAsync("folders.new.async", Folders.findOne(folder._id));

    return folder;
};

var folderViews = [];

Meteor.methods({

    /**
     * @summary Meteor method for submitting a folder from the client
     * NOTE: the current user and the folder author user might sometimes be two different users!
     * Required properties: title
     * @memberof Folders
     * @isMethod true
     * @param {Object} folder - the folder being inserted
     */
    'folders.new': function (folder) {

        Folders.simpleSchema().namedContext("folders.new").validate(folder);

        folder = Telescope.callbacks.run("folders.new.method", folder, Meteor.user());

        if (Meteor.isServer && this.connection) {
            folder.userIP = this.connection.clientAddress;
            folder.userAgent = this.connection.httpHeaders["user-agent"];
        }

        folder.posts = [];
        folder.posts.push(folder.lastPost);

        return Folders.methods.new(folder);
    },

    //"folders.deleteById": function (folderId) {
    //
    //    check(folderId, String);
    //
    //    const currentUser = this.userId && Users.findOne(this.userId);
    //
    //    if (Users.canDo(currentUser, "folders.remove.all")) {
    //
    //        // delete folder
    //        Folders.remove(folderId);
    //
    //        // find any direct children of this folder and make them root folders
    //        //Folders.find({parentId: folderId}).forEach(function (folder) {
    //        //  Folders.update(folder._id, {$unset: {parentId: ""}});
    //        //});
    //
    //        // find any folders with this folder and remove it
    //        var foldersUpdated = Folders.update({folders: {$in: [folderId]}}, {$pull: {folders: folderId}}, {multi: true});
    //
    //        return foldersUpdated;
    //
    //    }
    //}
});

//Folders.smartMethods({
//  createName: "folders.new",
//  editName: "folders.edit"
//});