import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Collections from "./collection.js";

Meteor.methods({
  "collections.deleteById": function (collectionId) {
    
    check(collectionId, String);
    
    const currentUser = this.userId && Users.findOne(this.userId);

    if (Users.canDo(currentUser, "collections.remove.all")) {

      // delete collection
      Collections.remove(collectionId);

      // find any direct children of this collection and make them root collections
      //Collections.find({parentId: collectionId}).forEach(function (collection) {
      //  Collections.update(collection._id, {$unset: {parentId: ""}});
      //});

      // find any posts with this collection and remove it
      var postsUpdated = Posts.update({collections: {$in: [collectionId]}}, {$pull: {collections: collectionId}}, {multi: true});

      return postsUpdated;

    }
  }
});

Collections.smartMethods({
  createName: "collections.new",
  editName: "collections.edit"
});