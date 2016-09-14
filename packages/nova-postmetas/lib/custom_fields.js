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
      fieldName: 'post_meta_id',
      fieldSchema: {
          type: String,
          optional: true,
          publish: true,
          join: {
              joinAs: "image_meta",
              collection: () => PostMetas
          }
      }
  }
);

PublicationUtils.addToFields(Posts.publishedFields.list, ["post_meta_id"]);
