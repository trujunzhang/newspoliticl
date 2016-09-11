import Telescope from 'meteor/nova:lib';
import Collections from "./collection.js";
import Users from 'meteor/nova:users';

const canInsert = user => Users.canDo(user, "collections.new");
const canEdit = user => Users.canDo(user, "collections.edit.all");

// collection schema
Collections.schema = new SimpleSchema({
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
  }
  //parentId: {
  //  type: String,
  //  optional: true,
  //  insertableIf: canInsert,
  //  editableIf: canEdit,
  //  publish: true,
  //  autoform: {
  //    options: function () {
  //      var collections = Collections.find().map(function (collection) {
  //        return {
  //          value: collection._id,
  //          label: collection.name
  //        };
  //      });
  //      return collections;
  //    }
  //  }
  //}
});

// Meteor.startup(function(){
//   Collections.internationalize();
// });

Collections.attachSchema(Collections.schema);


Telescope.settings.collection.addField([
  {
    fieldName: 'collectionsBehavior',
    fieldSchema: {
      type: String,
      optional: true,
      autoform: {
        group: 'collections',
        instructions: 'Let users filter by one or multiple collections at a time.',
        options: function () {
          return [
            {value: "single", label: "collections_behavior_one_at_a_time"},
            {value: "multiple", label: "collections_behavior_multiple"}
          ];
        }
      }
    }
  },
  {
    fieldName: 'hideEmptyCollections',
    fieldSchema: {
      type: Boolean,
      optional: true,
      autoform: {
        group: 'collections',
        instructions: 'Hide empty collections in navigation'
      }
    }
  }
]);