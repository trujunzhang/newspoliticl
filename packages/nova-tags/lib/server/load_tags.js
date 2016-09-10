import Telescope from 'meteor/nova:lib';
import Tags from "../collection.js";

// Load tags from settings, if there are any

if (Meteor.settings && Meteor.settings.tags) {
  Meteor.settings.tags.forEach(tag => {

    // get slug (or slugified name)
    const slug = tag.slug || Telescope.utils.slugify(tag.name);

    // look for existing tag with same slug
    let existingTag = Tags.findOne({slug: slug});

    if (existingTag) {
      // if tag exists, update it with settings data except slug
      delete tag.slug;
      Tags.update(existingTag._id, {$set: tag});
    } else {
      // if not, create it
      Tags.insert(tag);
      console.log(`// Creating tag “${tag.name}”`);
    }
  });
}
