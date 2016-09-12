import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Folders from "../collection.js";

Meteor.publish('folders', function () {

    const currentUser = this.userId && Users.findOne(this.userId);

    if (Users.canDo(currentUser, "folders.view.approved.all")) {

        var folders = Folders.find({}, {fields: Folders.publishedFields.list});
        var publication = this;

        //folders.forEach(function (folder) {
        //  var childrenFolders = folder.getChildren();
        //  var folderIds = [folder._id].concat(_.pluck(childrenFolders, "_id"));
        //  var cursor = Posts.find({$and: [{folders: {$in: folderIds}}, {status: Posts.config.STATUS_APPROVED}]});
        //  // Counts.publish(publication, folder.getCounterName(), cursor, { noReady: true });
        //});

        return folders;
    }
    return [];
});