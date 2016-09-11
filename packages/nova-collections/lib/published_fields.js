import Collections from './collection.js'
import PublicationsUtils from 'meteor/utilities:smart-publications';

Collections.publishedFields = {};

/**
 * @summary Specify which fields should be published by the collections publication
 * @array Collections.publishedFields.list
 */
Collections.publishedFields.list = PublicationsUtils.arrayToFields([
  "name",
  "description",
  "order",
  "slug",
  "image",
  "parentId",
]);