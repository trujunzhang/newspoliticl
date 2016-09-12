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

// ------------------------------------- folders.new.async -------------------------------- //

function FoldersNewOperations(folder) {

    var userId = folder.userId;
    var folderId = folder._id;

    // increment folder count
    Meteor.users.update({_id: userId}, {
        $inc: {'telescope.folderCount': 1},
        $addToSet: {folders: folderId}
    });

    return folder;
}
Telescope.callbacks.add("folders.new.async", FoldersNewOperations);