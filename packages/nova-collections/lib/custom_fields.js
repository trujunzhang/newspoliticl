import PublicationUtils from 'meteor/utilities:smart-publications';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Collections from "./collection.js";

// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

Posts.addField(
  {
    fieldName: 'collections',
    fieldSchema: {
      type: [String],
      control: "checkboxgroup",
      optional: true,
      insertableIf: canInsert,
      editableIf: canEdit,
      autoform: {
        noselect: true,
        type: "bootstrap-collection",
        order: 50,
        options: function () {
          var collections = Collections.find().map(function (collection) {
            return {
              value: collection._id,
              label: collection.name
            };
          });
          return collections;
        }
      },
      publish: true,
      join: {
        joinAs: "collectionsArray",
        collection: () => Collections
      }
    }
  }
);

PublicationUtils.addToFields(Posts.publishedFields.list, ["collections"]);
