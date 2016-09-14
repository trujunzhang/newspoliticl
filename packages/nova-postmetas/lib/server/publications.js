import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import PostMetas from "../collection.js";

Meteor.publish('postmetas', function() {
  
  const currentUser = this.userId && Users.findOne(this.userId);

  if(Users.canDo(currentUser, "posts.view.approved.all")){
    
    var postmetas = PostMetas.find({}, {fields: PostMetas.publishedFields.list});
    var publication = this;

    postmetas.forEach(function (postmeta) {
      var childrenPostMetas = postmeta.getChildren();
      var postmetaIds = [postmeta._id].concat(_.pluck(childrenPostMetas, "_id"));
      var cursor = Posts.find({$and: [{postmetas: {$in: postmetaIds}}, {status: Posts.config.STATUS_APPROVED}]});
      // Counts.publish(publication, postmeta.getCounterName(), cursor, { noReady: true });
    });

    return postmetas;
  }
  return [];
});