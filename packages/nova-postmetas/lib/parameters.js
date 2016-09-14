import Telescope from 'meteor/nova:lib';
import PostMetas from "./collection.js";

// PostMeta Parameter
// Add a "postmetas" property to terms which can be used to filter *all* existing Posts views.
function addPostMetaParameter (parameters, terms) {

  var postmeta = terms.postmeta || terms["postmeta[]"];

  // filter by postmeta if postmeta slugs are provided
  if (postmeta) {

    var postmetasIds = [];
    var selector = {};

    if (typeof postmeta === "string") { // postmeta is a string
      selector = {slug: postmeta};
    } else if (Array.isArray(postmeta)) { // postmeta is an array
      selector = {slug: {$in: postmeta}};
    }

    // get all postmetas passed in terms
    var postmetas = PostMetas.find(selector).fetch();
    
    // for each postmeta, add its ID and the IDs of its children to postmetasId array
    postmetas.forEach(function (postmeta) {
      postmetasIds.push(postmeta._id);
      postmetasIds = postmetasIds.concat(_.pluck(PostMetas.getChildren(postmeta), "_id"));
    });

    parameters.selector.postmetas = {$in: postmetasIds};
  }
  return parameters;
}
Telescope.callbacks.add("postsParameters", addPostMetaParameter);