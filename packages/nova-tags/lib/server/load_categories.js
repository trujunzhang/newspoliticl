import Telescope from 'meteor/nova:lib';
import Tags from "../collection.js";

// Load tags from settings, if there are any

if (Meteor.settings && Meteor.settings.tags) {
  Meteor.settings.tags.forEach(category => {

    // get slug (or slugified name)
    const slug = category.slug || Telescope.utils.slugify(category.name);

    // look for existing category with same slug
    let existingCategory = Tags.findOne({slug: slug});

    if (existingCategory) {
      // if category exists, update it with settings data except slug
      delete category.slug;
      Tags.update(existingCategory._id, {$set: category});
    } else {
      // if not, create it
      Tags.insert(category);
      console.log(`// Creating category “${category.name}”`);
    }
  });
}
