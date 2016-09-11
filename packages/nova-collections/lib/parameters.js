import Telescope from 'meteor/nova:lib';
import Collections from "./collection.js";

// Collection Parameter
// Add a "collections" property to terms which can be used to filter *all* existing Posts views.
function addCollectionParameter (parameters, terms) {

  var cat = terms.cat || terms["cat[]"];

  // filter by collection if collection slugs are provided
  if (cat) {

    var collectionsIds = [];
    var selector = {};

    if (typeof cat === "string") { // cat is a string
      selector = {slug: cat};
    } else if (Array.isArray(cat)) { // cat is an array
      selector = {slug: {$in: cat}};
    }

    // get all collections passed in terms
    var collections = Collections.find(selector).fetch();
    
    // for each collection, add its ID and the IDs of its children to collectionsId array
    collections.forEach(function (collection) {
      collectionsIds.push(collection._id);
      collectionsIds = collectionsIds.concat(_.pluck(Collections.getChildren(collection), "_id"));
    });

    parameters.selector.collections = {$in: collectionsIds};
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", addCollectionParameter);