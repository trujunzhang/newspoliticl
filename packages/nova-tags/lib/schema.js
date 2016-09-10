import Telescope from 'meteor/nova:lib';
import Tags from "./collection.js";
import Users from 'meteor/nova:users';

const canInsert = user => Users.canDo(user, "tags.new");
const canEdit = user => Users.canDo(user, "tags.edit.all");

// tag schema
Tags.schema = new SimpleSchema({
  name: {
    type: String,
    insertableIf: canInsert,
    editableIf: canEdit,
    publish: true
  },
  description: {
    type: String,
    optional: true,
    insertableIf: canInsert,
    editableIf: canEdit,
    publish: true,
    autoform: {
      rows: 3
    }
  },
  order: {
    type: Number,
    optional: true,
    insertableIf: canInsert,
    editableIf: canEdit,
    publish: true
  },
  slug: {
    type: String,
    optional: true,
    insertableIf: canInsert,
    editableIf: canEdit,
    publish: true
  },
  image: {
    type: String,
    optional: true,
    insertableIf: canInsert,
    editableIf: canEdit,
    publish: true
  },
  parentId: {
    type: String,
    optional: true,
    insertableIf: canInsert,
    editableIf: canEdit,
    publish: true,
    autoform: {
      options: function () {
        var tags = Tags.find().map(function (tag) {
          return {
            value: tag._id,
            label: tag.name
          };
        });
        return tags;
      }
    }
  }
});

// Meteor.startup(function(){
//   Tags.internationalize();
// });

Tags.attachSchema(Tags.schema);


Telescope.settings.collection.addField([
  {
    fieldName: 'tagsBehavior',
    fieldSchema: {
      type: String,
      optional: true,
      autoform: {
        group: 'tags',
        instructions: 'Let users filter by one or multiple tags at a time.',
        options: function () {
          return [
            {value: "single", label: "tags_behavior_one_at_a_time"},
            {value: "multiple", label: "tags_behavior_multiple"}
          ];
        }
      }
    }
  },
  {
    fieldName: 'hideEmptyTags',
    fieldSchema: {
      type: Boolean,
      optional: true,
      autoform: {
        group: 'tags',
        instructions: 'Hide empty tags in navigation'
      }
    }
  }
]);