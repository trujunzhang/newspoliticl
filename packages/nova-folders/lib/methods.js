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

/**
 * @summary Edit a folder in the database
 * @param {string} folderId – the ID of the folder being edited
 * @param {Object} modifier – the modifier object
 * @param {Object} folder - the current folder object
 */
Folders.methods.edit = function (folderId, modifier, folder) {

    if (typeof folder === "undefined") {
        folder = Folders.findOne(folderId);
    }

    modifier = Telescope.callbacks.run("folders.edit.sync", modifier, folder);

    Folders.update(folderId, modifier);

    Telescope.callbacks.runAsync("folders.edit.async", Folders.findOne(folderId), folder);

    return Folders.findOne(folderId);
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

        folder.posts = [folder.lastPost];

        return Folders.methods.new(folder);
    },

    /**
     * @summary Meteor method for submitting a folder from the client
     * NOTE: the current user and the folder author user might sometimes be two different users!
     * Required properties: title
     * @memberof Folders
     * @isMethod true
     * @param {Object} folder - the folder being inserted
     */
    'folders.insertPost': function (folder) {

        var item = Folders.findOne(folder._id);

        folder = Telescope.callbacks.run("folders.insertPost.method", folder, Meteor.user());

        update = {
            $addToSet: {posts: folder.lastPost},
        };

        var result = Folders.update({_id: item._id}, update);

        if (result > 0) {
            // --------------------- Server-Side Async Callbacks --------------------- //

            return true;
        }
    },

    /**
     * @summary Meteor method for deleting a post
     * @memberof Posts
     * @isMethod true
     * @param {String} folderId - the id of the post
     */
    'folders.remove': function (folderId) {

        check(folderId, String);

        // remove folder comments
        // if(!this.isSimulation) {
        //   Comments.remove({folder: folderId});
        // }
        // NOTE: actually, keep comments after all

        var folder = Folders.findOne({_id: folderId});

        // delete folder
        Folders.remove(folderId);

        Telescope.callbacks.runAsync("folders.remove.async", folder);

    },

    /**
     * @summary Meteor method for deleting a post
     * @memberof Folders
     * @isMethod true
     * @param {String} editedFolder - the id of the post
     */
    'folders.editFolderName': function (editedFolder) {

        modifier = {$set:{name: editedFolder.newName}};

        const folderId = editedFolder._id;

        Folders.simpleSchema().namedContext("folders.edit").validate(modifier, {modifier: true});
        check(folderId, String);

        const folder = Folders.findOne(folderId);

        modifier = Telescope.callbacks.run("folders.edit.method", modifier, folder, Meteor.user());

        return Folders.methods.edit(folderId, modifier, folder);

    },


    /**
     * @summary Meteor method for deleting a post
     * @memberof Folders
     * @isMethod true
     * @param {String} editedFolder - the id of the post
     */
    'folders.editFolderDescription': function (editedFolder) {

        modifier = {$set:{description: editedFolder.newDesctiption}};

        const folderId = editedFolder._id;

        Folders.simpleSchema().namedContext("folders.edit").validate(modifier, {modifier: true});
        check(folderId, String);

        const folder = Folders.findOne(folderId);

        modifier = Telescope.callbacks.run("folders.edit.method", modifier, folder, Meteor.user());

        return Folders.methods.edit(folderId, modifier, folder);

    },

});

//Folders.smartMethods({
//  createName: "folders.new",
//  editName: "folders.edit"
//});