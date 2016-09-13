import PublicationUtils from 'meteor/utilities:smart-publications';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Folders from 'meteor/nova:folders';
import Categories from "./collection.js";

// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

Folders.addField(
  {
      fieldName: 'categories',
      fieldSchema: {
          type: [String],
          control: "checkboxgroup",
          optional: true,
          insertableIf: canInsert,
          editableIf: canEdit,
          autoform: {
              noselect: true,
              type: "bootstrap-category",
              order: 50,
              options: function () {
                  var folders = Folders.find().map(function (folder) {
                      return {
                          value: folder._id,
                          label: folder.name
                      };
                  });
                  return folders;
              }
          },
          publish: true,
          join: {
              joinAs: "postsArray",
              collection: () => Folders
          }
      }
  }
);

PublicationUtils.addToFields(Folders.publishedFields.list, ["postsArray"]);
