import PublicationUtils from 'meteor/utilities:smart-publications';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import PostMetas from "./collection.js";

// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

Posts.addField(
  {
    fieldName: 'postmetas',
    fieldSchema: {
      type: [String],
      control: "checkboxgroup",
      optional: true,
      insertableIf: canInsert,
      editableIf: canEdit,
      autoform: {
        noselect: true,
        type: "bootstrap-postmeta",
        order: 50,
        options: function () {
          var postmetas = PostMetas.find().map(function (postmeta) {
            return {
              value: postmeta._id,
              label: postmeta.name
            };
          });
          return postmetas;
        }
      },
      publish: true,
      join: {
        joinAs: "postmetasArray",
        collection: () => PostMetas
      }
    }
  }
);

PublicationUtils.addToFields(Posts.publishedFields.list, ["postmetas"]);
