import PublicationUtils from 'meteor/utilities:smart-publications';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Folders from "./collection.js";

Users.addField([
    /**
     Count of the user's Folders
     */
    {
        fieldName: "telescope.folderCount",
        fieldSchema: {
            type: Number,
            optional: true,
            publish: true,
            defaultValue: 0
        }
    },
    /**
     An array containing the `_id`s of folders
     */
    {
        fieldName: "telescope.folders",
        fieldSchema: {
            type: [String],
            optional: true,
            publish: true,
            join: {
                joinAs: "foldersArray",
                collection: () => Folders
            }
        }
    }
]);

PublicationUtils.addToFields(Users.publishedFields.list, ["telescope.folderCount", "telescope.folders"]);

