import Telescope from 'meteor/nova:lib';
import Folders from "./collection.js";
import Users from 'meteor/nova:users';

const canInsert = user => Users.canDo(user, "folders.new");
const canEdit = user => Users.canDo(user, "folders.edit.all");

// folder schema
Folders.schema = new SimpleSchema({
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
  //      var folders = Folders.find().map(function (folder) {
  //        return {
  //          value: folder._id,
  //          label: folder.name
  //        };
  //      });
  //      return folders;
  //    }
  //  }
  //}
});

// Meteor.startup(function(){
//   Folders.internationalize();
// });

Folders.attachSchema(Folders.schema);


Telescope.settings.collection.addField([
  {
    fieldName: 'foldersBehavior',
    fieldSchema: {
      type: String,
      optional: true,
      autoform: {
        group: 'folders',
        instructions: 'Let users filter by one or multiple folders at a time.',
        options: function () {
          return [
            {value: "single", label: "folders_behavior_one_at_a_time"},
            {value: "multiple", label: "folders_behavior_multiple"}
          ];
        }
      }
    }
  },
  {
    fieldName: 'hideEmptyFolders',
    fieldSchema: {
      type: Boolean,
      optional: true,
      autoform: {
        group: 'folders',
        instructions: 'Hide empty folders in navigation'
      }
    }
  }
]);