import Telescope from 'meteor/nova:lib';
import Tags from "./collection.js";

// Category Parameter
// Add a "tags" property to terms which can be used to filter *all* existing Posts views.
function addCategoryParameter (parameters, terms) {

  var cat = terms.cat || terms["cat[]"];

  // filter by category if category slugs are provided
  if (cat) {

    var tagsIds = [];
    var selector = {};

    if (typeof cat === "string") { // cat is a string
      selector = {slug: cat};
    } else if (Array.isArray(cat)) { // cat is an array
      selector = {slug: {$in: cat}};
    }

    // get all tags passed in terms
    var tags = Tags.find(selector).fetch();
    
    // for each category, add its ID and the IDs of its children to tagsId array
    tags.forEach(function (category) {
      tagsIds.push(category._id);
      tagsIds = tagsIds.concat(_.pluck(Tags.getChildren(category), "_id"));
    });

    parameters.selector.tags = {$in: tagsIds};
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", addCategoryParameter);