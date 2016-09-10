import Tags from './collection.js'
import PublicationsUtils from 'meteor/utilities:smart-publications';

Tags.publishedFields = {};

/**
 * @summary Specify which fields should be published by the tags publication
 * @array Tags.publishedFields.list
 */
Tags.publishedFields.list = PublicationsUtils.arrayToFields([
  "name",
  "description",
  "order",
  "slug",
  "image",
  "parentId",
]);