import Telescope from 'meteor/nova:lib';
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

// ------------------------------------- folders.new.method -------------------------------- //

function FoldersNewUserCheck (folder, user) {
    // check that user can post
    if (!user || !Users.canDo(user, "folders.new"))
        throw new Meteor.Error(601, 'you_need_to_login_or_be_invited_to_post_new_folders');
    return folder;
}
Telescope.callbacks.add("folders.new.method", FoldersNewUserCheck);


function FoldersNewSubmittedPropertiesCheck (folder, user) {
    // admin-only properties
    // userId
    const schema = Folders.simpleSchema()._schema;

    // clear restricted properties
    //_.keys(folder).forEach(function (fieldName) {
    //
    //    // make an exception for postId, which should be setable but not modifiable
    //    if (fieldName === "postId") {
    //        // ok
    //    } else {
    //        var field = schema[fieldName];
    //        if (!Users.canSubmitField (user, field)) {
    //            throw new Meteor.Error("disallowed_property", 'disallowed_property_detected' + ": " + fieldName);
    //        }
    //    }
    //
    //});

    // if no userId has been set, default to current user id
    if (!folder.userId) {
        folder.userId = user._id;
    }
    return folder;
}
Telescope.callbacks.add("folders.new.method", FoldersNewSubmittedPropertiesCheck);


// ------------------------------------- folders.new.async -------------------------------- //

/**
 * @summary Check for required properties
 */
function FoldersNewRequiredPropertiesCheck (folder, user) {

    var userId = folder.userId; // at this stage, a userId is expected

    // Don't allow empty folders
    if (!folder.name)
        throw new Meteor.Error(704, 'your_name_is_empty');

    var defaultProperties = {
        createdAt: new Date(),
        postedAt: new Date(),
    };

    folder = _.extend(defaultProperties, folder);

    return folder;
}
Telescope.callbacks.add("folders.new.sync", FoldersNewRequiredPropertiesCheck);


function FoldersNewOperations(folder) {

    var userId = folder.userId;
    var folderId = folder._id;

    // increment folder count
    Meteor.users.update({_id: userId}, {
        $inc: {'telescope.folderCount': 1},
        $addToSet: {'telescope.folders': folderId}
    });

    return folder;
}
Telescope.callbacks.add("folders.new.async", FoldersNewOperations);

function FoldersRemoveOperations(folder) {

    var userId = folder.userId;
    var folderId = folder._id;

    // increment folder count
    Meteor.users.update({_id: userId}, {
        $inc: {'telescope.folderCount': -1},
        $pull: {'telescope.folders': folderId}
    });

    return folder;
}
Telescope.callbacks.add("folders.remove.async", FoldersRemoveOperations);