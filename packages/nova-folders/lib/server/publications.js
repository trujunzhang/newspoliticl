import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Folders from "../collection.js";

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

        Counts.publish(this, terms.listId, Folders.find(selector, options), {noReady: true});

        options.fields = Folders.publishedFields.list;

        const folders = Folders.find(selector, options);

        // note: doesn't work yet :(
        // CursorCounts.set(terms, folders.count(), this.connection.id);

        return Users.canDo(currentUser, "folders.view.approved.all") ? [folders] : [];
    });

});

