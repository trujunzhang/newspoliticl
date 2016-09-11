import Folders from './collection.js'
import PublicationsUtils from 'meteor/utilities:smart-publications';

Folders.publishedFields = {};

/**
 * @summary Specify which fields should be published by the folders publication
 * @array Folders.publishedFields.list
 */
Folders.publishedFields.list = PublicationsUtils.arrayToFields([
  "name",
  "description",
  "order",
  "slug",
  "image",
  //"parentId",
]);