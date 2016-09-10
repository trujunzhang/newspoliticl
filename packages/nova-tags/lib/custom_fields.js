import PublicationUtils from 'meteor/utilities:smart-publications';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Tags from "./collection.js";

// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

Posts.addField(
  {
    fieldName: 'tags',
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
          var tags = Tags.find().map(function (category) {
            return {
              value: category._id,
              label: category.name
            };
          });
          return tags;
        }
      },
      publish: true,
      join: {
        joinAs: "tagsArray",
        collection: () => Tags
      }
    }
  }
);

PublicationUtils.addToFields(Posts.publishedFields.list, ["tags"]);
