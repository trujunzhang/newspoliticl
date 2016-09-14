import Telescope from 'meteor/nova:lib';
import Tags from "./collection.js";

// Tag Parameter
// Add a "tags" property to terms which can be used to filter *all* existing Posts views.
function addTagParameter (parameters, terms) {

  var tag = terms.tag || terms["tag[]"];

  // filter by tag if tag slugs are provided
  if (tag) {

    var tagsIds = [];
    var selector = {};

    if (typeof tag === "string") { // tag is a string
      selector = {slug: tag};
    } else if (Array.isArray(tag)) { // tag is an array
      selector = {slug: {$in: tag}};
    }

    // get all tags passed in terms
    var tags = Tags.find(selector).fetch();
    
    // for each tag, add its ID and the IDs of its children to tagsId array
    tags.forEach(function (tag) {
      tagsIds.push(tag._id);
      tagsIds = tagsIds.concat(_.pluck(Tags.getChildren(tag), "_id"));
    });

    parameters.selector.tags = {$in: tagsIds};
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", addTagParameter);