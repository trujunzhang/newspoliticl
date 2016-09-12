import Telescope from 'meteor/nova:lib';
import Folders from "./collection.js";

/**
 * @summary Parameter callbacks let you add parameters to subscriptions
 * @namespace Posts.parameters
 */
Folders.parameters = {};

/**
 * @summary Takes a set of terms, and translates them into a `parameter` object containing the appropriate find
 * and options arguments for the subscriptions's Posts.find()
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
        selector: {},
        options: {}
    };

    // iterate over foldersParameters callbacks
    parameters = Telescope.callbacks.run("foldersParameters", parameters, _.clone(terms));

    // if sort options are not provided, default to "createdAt" sort
    if (_.isEmpty(parameters.options.sort)) {
        parameters.options.sort = {sticky: -1, createdAt: -1};
    }

    // extend sort to sort folders by _id to break ties
    // NOTE: always do this last to avoid _id sort overriding another sort
    parameters = Telescope.utils.deepExtend(true, parameters, {options: {sort: {_id: -1}}});

    // console.log(parameters);

    return parameters;
};

