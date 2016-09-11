import Telescope from 'meteor/nova:lib';
import Folders from "../collection.js";

// Load folders from settings, if there are any

if (Meteor.settings && Meteor.settings.folders) {
  Meteor.settings.folders.forEach(folder => {

    // get slug (or slugified name)
    const slug = folder.slug || Telescope.utils.slugify(folder.name);

    // look for existing folder with same slug
    let existingFolder = Folders.findOne({slug: slug});

    if (existingFolder) {
      // if folder exists, update it with settings data except slug
      delete folder.slug;
      Folders.update(existingFolder._id, {$set: folder});
    } else {
      // if not, create it
      Folders.insert(folder);
      console.log(`// Creating folder “${folder.name}”`);
    }
  });
}
