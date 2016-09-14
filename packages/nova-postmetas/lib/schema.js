import Telescope from 'meteor/nova:lib';
import PostMetas from "./collection.js";
import Users from 'meteor/nova:users';

const canInsert = user => Users.canDo(user, "postmetas.new");
const canEdit = user => Users.canDo(user, "postmetas.edit.all");

// postmeta schema
PostMetas.schema = new SimpleSchema({
  _id: {
    type: String,
    publish: true
  },
  url: {
    type: String,
    optional: true,
    publish: true,
  },
  value: {
    type: Number,
    optional: true,
    publish: true
  }
});

// Meteor.startup(function(){
//   PostMetas.internationalize();
// });

PostMetas.attachSchema(PostMetas.schema);


//Telescope.settings.collection.addField([
//  {
//    fieldName: 'postmetasBehavior',
//    fieldSchema: {
//      type: String,
//      optional: true,
//      autoform: {
//        group: 'postmetas',
//        instructions: 'Let users filter by one or multiple postmetas at a time.',
//        options: function () {
//          return [
//            {value: "single", label: "postmetas_behavior_one_at_a_time"},
//            {value: "multiple", label: "postmetas_behavior_multiple"}
//          ];
//        }
//      }
//    }
//  },
//  {
//    fieldName: 'hideEmptyPostMetas',
//    fieldSchema: {
//      type: Boolean,
//      optional: true,
//      autoform: {
//        group: 'postmetas',
//        instructions: 'Hide empty postmetas in navigation'
//      }
//    }
//  }
//]);