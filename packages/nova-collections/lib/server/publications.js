import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Collections from "../collection.js";

Meteor.publish('collections', function() {
  
  const currentUser = this.userId && Users.findOne(this.userId);

  if(Users.canDo(currentUser, "posts.view.approved.all")){
    
    var collections = Collections.find({}, {fields: Collections.publishedFields.list});
    var publication = this;

    collections.forEach(function (collection) {
      var childrenCollections = collection.getChildren();
      var collectionIds = [collection._id].concat(_.pluck(childrenCollections, "_id"));
      var cursor = Posts.find({$and: [{collections: {$in: collectionIds}}, {status: Posts.config.STATUS_APPROVED}]});
      // Counts.publish(publication, collection.getCounterName(), cursor, { noReady: true });
    });

    return collections;
  }
  return [];
});