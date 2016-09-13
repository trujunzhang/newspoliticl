import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Folders from "../collection.js";

Meteor.publish('folders', function () {

    const currentUser = this.userId && Users.findOne(this.userId);

    if (Users.canDo(currentUser, "folders.view.approved.all")) {
        var userId = currentUser._id;

        var folders = Folders.find({userId: userId}, {fields: Folders.publishedFields.list});
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

/**
 * @summary Publish a list of folders, along with the users corresponding to these folders
 * @param {Object} terms
 */
Meteor.publish('folders.list', function (terms) {

    // this.unblock(); // causes bug where publication returns 0 results

    this.autorun(function () {

        const currentUser = this.userId && Meteor.users.findOne(this.userId);

        terms.currentUserId = this.userId; // add currentUserId to terms
        const {selector, options} = Folders.parameters.get(terms);

        Counts.publish(this, terms.userId, Posts.find(selector, options), {noReady: true});

        options.fields = Folders.publishedFields.list;

        const posts = Folders.find(selector, options);

        // note: doesn't work yet :(
        // CursorCounts.set(terms, posts.count(), this.connection.id);

        return Users.canDo(currentUser, "folders.view.approved.all") ? [posts] : [];
    });

});

/**
 * @summary Publish a list of folders, along with the users corresponding to these folders
 * @param {Object} terms
 */
//Meteor.publish('folders.single', function (terms) {
//
//    // this.unblock(); // causes bug where publication returns 0 results
//
//    this.autorun(function () {
//
//        const currentUser = this.userId && Meteor.users.findOne(this.userId);
//
//        terms.currentUserId = this.userId; // add currentUserId to terms
//        const {selector, options} = Folders.parameters.get(terms);
//
//        Counts.publish(this, terms.userId, Posts.find(selector, options), {noReady: true});
//
//        options.fields = Folders.publishedFields.list;
//
//        const posts = Folders.find(selector, options);
//
//        // note: doesn't work yet :(
//        // CursorCounts.set(terms, posts.count(), this.connection.id);
//
//        return Users.canDo(currentUser, "folders.view.approved.all") ? [posts] : [];
//    });
//
//});

/**
 * @summary Publish a single post, along with all relevant users
 * @param {Object} terms
 */
Meteor.publish('folders.single', function (terms) {

    check(terms, Match.OneOf({_id: String}));

    const currentUser = this.userId && Meteor.users.findOne(this.userId);
    const options = {fields: Posts.publishedFields.single};
    const folders = Folders.find(terms._id, options);
    const folder = folders.fetch()[0];

    if (folder) {
        // Query collected posts in this folder by postId recording in the folder's posts.
        var postsArray = [];
        folder.posts.forEach(function (postId) {
            var post = Posts.find({_id: postId}).fetch();
            if (post) {
                postsArray.push(post);
            }
        });
        folder.postsArray = postsArray;

        return [folders];
    } else {
        console.log(`// folders.single: no collection found for _id “${terms._id}”`);
        return [];
    }

});