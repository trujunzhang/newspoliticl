import Telescope from 'meteor/nova:lib';
import Folders from "./collection.js";

// Folder Parameter
// Add a "folders" property to terms which can be used to filter *all* existing Posts views.
function addFolderParameter (parameters, terms) {

  var cat = terms.cat || terms["cat[]"];

  // filter by folder if folder slugs are provided
  if (cat) {

    var foldersIds = [];
    var selector = {};

    if (typeof cat === "string") { // cat is a string
      selector = {slug: cat};
    } else if (Array.isArray(cat)) { // cat is an array
      selector = {slug: {$in: cat}};
    }

    // get all folders passed in terms
    var folders = Folders.find(selector).fetch();
    
    // for each folder, add its ID and the IDs of its children to foldersId array
    folders.forEach(function (folder) {
      foldersIds.push(folder._id);
      foldersIds = foldersIds.concat(_.pluck(Folders.getChildren(folder), "_id"));
    });

    parameters.selector.folders = {$in: foldersIds};
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", addFolderParameter);