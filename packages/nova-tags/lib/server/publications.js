import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import Tags from "../collection.js";

Meteor.publish('tags', function() {
  
  const currentUser = this.userId && Users.findOne(this.userId);

  if(Users.canDo(currentUser, "posts.view.approved.all")){
    
    var tags = Tags.find({}, {fields: Tags.publishedFields.list});
    var publication = this;

    tags.forEach(function (category) {
      var childrenTags = category.getChildren();
      var categoryIds = [category._id].concat(_.pluck(childrenTags, "_id"));
      var cursor = Posts.find({$and: [{tags: {$in: categoryIds}}, {status: Posts.config.STATUS_APPROVED}]});
      // Counts.publish(publication, category.getCounterName(), cursor, { noReady: true });
    });

    return tags;
  }
  return [];
});