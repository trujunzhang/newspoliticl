import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import PostMetas from "./collection.js";

Meteor.methods({
  "postmetas.deleteById": function (postmetaId) {
    
    check(postmetaId, String);
    
    const currentUser = this.userId && Users.findOne(this.userId);

    if (Users.canDo(currentUser, "postmetas.remove.all")) {

      // delete postmeta
      PostMetas.remove(postmetaId);

      // find any direct children of this postmeta and make them root postmetas
      PostMetas.find({parentId: postmetaId}).forEach(function (postmeta) {
        PostMetas.update(postmeta._id, {$unset: {parentId: ""}});
      });

      // find any posts with this postmeta and remove it
      var postsUpdated = Posts.update({postmetas: {$in: [postmetaId]}}, {$pull: {postmetas: postmetaId}}, {multi: true});

      return postsUpdated;

    }
  }
});

PostMetas.smartMethods({
  createName: "postmetas.new",
  editName: "postmetas.edit"
});