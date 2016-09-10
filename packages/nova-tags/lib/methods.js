import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Tags from "./collection.js";

Meteor.methods({
  "tags.deleteById": function (tagId) {
    
    check(tagId, String);
    
    const currentUser = this.userId && Users.findOne(this.userId);

    if (Users.canDo(currentUser, "tags.remove.all")) {

      // delete tag
      Tags.remove(tagId);

      // find any direct children of this tag and make them root tags
      Tags.find({parentId: tagId}).forEach(function (tag) {
        Tags.update(tag._id, {$unset: {parentId: ""}});
      });

      // find any posts with this tag and remove it
      var postsUpdated = Posts.update({tags: {$in: [tagId]}}, {$pull: {tags: tagId}}, {multi: true});

      return postsUpdated;

    }
  }
});

Tags.smartMethods({
  createName: "tags.new",
  editName: "tags.edit"
});