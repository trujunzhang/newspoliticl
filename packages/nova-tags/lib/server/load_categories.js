import Telescope from 'meteor/nova:lib';
import Categories from "../collection.js";

// Load tags from settings, if there are any

if (Meteor.settings && Meteor.settings.tags) {
  Meteor.settings.tags.forEach(category => {

    // get slug (or slugified name)
    const slug = category.slug || Telescope.utils.slugify(category.name);

    // look for existing category with same slug
    let existingCategory = Categories.findOne({slug: slug});

    if (existingCategory) {
      // if category exists, update it with settings data except slug
      delete category.slug;
      Categories.update(existingCategory._id, {$set: category});
    } else {
      // if not, create it
      Categories.insert(category);
      console.log(`// Creating category “${category.name}”`);
    }
  });
}
