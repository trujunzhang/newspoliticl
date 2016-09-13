import Telescope from 'meteor/nova:lib';
import Folders from "./collection.js";

/**
 * @summary Parameter callbacks let you add parameters to subscriptions
 * @namespace Folders.parameters
 */
Folders.parameters = {};

/**
 * @summary Takes a set of terms, and translates them into a `parameter` object containing the appropriate find
 * and options arguments for the subscriptions's Folders.find()
 * @memberof Parameters
 * @param {Object} terms
 */
Folders.parameters.get = function (terms) {

    // add this to ensure all folder publications pass audit-arguments-check
    check(terms, Match.Any);

    // console.log(terms)

    // note: using jquery's extend() with "deep" parameter set to true instead of shallow _.extend()
    // see: http://api.jquery.com/jQuery.extend/

    // initialize parameters with empty object
    let parameters = {
        selector: {userId: terms.userId},
        options: {}
    };

    // iterate over foldersParameters callbacks
    parameters = Telescope.callbacks.run("foldersParameters", parameters, _.clone(terms));

    // if sort options are not provided, default to "createdAt" sort
    if (_.isEmpty(parameters.options.sort)) {
        parameters.options.sort = {createdAt: -1};
    }

    // extend sort to sort folders by _id to break ties
    // NOTE: always do this last to avoid _id sort overriding another sort
    parameters = Telescope.utils.deepExtend(true, parameters, {options: {sort: {_id: -1}}});

    // console.log(parameters);

    return parameters;
};


// Tag Parameter
// Add a "tags" property to terms which can be used to filter *all* existing Posts views.
function addFolderParameter (parameters, terms) {

    var folderID = terms.folderId || terms["folderID[]"];

    // filter by folderID if folderID slugs are provided
    if (folderID) {

        var tagsIds = [];
        var selector = {};

        if (typeof folderID === "string") { // folderID is a string
            selector = {slug: folderID};
        } else if (Array.isArray(folderID)) { // folderID is an array
            selector = {slug: {$in: folderID}};
        }

        // get all tags passed in terms
        var tags = Tags.find(selector).fetch();

        // for each folderID, add its ID and the IDs of its children to tagsId array
        tags.forEach(function (tag) {
            tagsIds.push(tag._id);
            tagsIds = tagsIds.concat(_.pluck(Tags.getChildren(tag), "_id"));
        });

        parameters.selector.tags = {$in: tagsIds};
    }
    return parameters;
}
Telescope.callbacks.add("postsParameters", addFolderParameter);