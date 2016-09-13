import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Folders from "../collection.js";

Meteor.publish('folders', function () {

    const currentUser = this.userId && Users.findOne(this.userId);

    if (Users.canDo(currentUser, "folders.view.approved.all")) {
        var userId = currentUser._id;

        var folders = Folders.find({userId: userId}, {fields: Folders.publishedFields.list});
        var publication = this;

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

        const folders = Folders.find(selector, options);

        // note: doesn't work yet :(
        // CursorCounts.set(terms, folders.count(), this.connection.id);

        return Users.canDo(currentUser, "folders.view.approved.all") ? [folders] : [];
    });

});

/**
 * @summary Publish a single folder, along with all relevant users
 * @param {Object} terms
 */
Meteor.publish('folders.single', function (terms) {

    check(terms, Match.OneOf({_id: String}));

    const currentUser = this.userId && Meteor.users.findOne(this.userId);
    const options = {fields: Folders.publishedFields.single};
    const folders = Folders.find({_id: terms._id}, options);
    const folder = folders.fetch()[0];

    if (folder) {
        const postIds = folder.posts;
        //const posts = Tracker.nonreactive(function () {
        //    return getPostsList(postIds);
        //});

        const posts = Posts.find({_id: {$in: postIds}}, {fields: Posts.publishedFields.list});

        return [folders, posts];
    } else {
        console.log(`// folders.single: no collection found for _id “${terms._id}”`);
        return [];
    }

});