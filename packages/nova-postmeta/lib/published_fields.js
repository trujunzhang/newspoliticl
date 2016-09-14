import PostMetas from './collection.js'
import PublicationsUtils from 'meteor/utilities:smart-publications';

PostMetas.publishedFields = {};

/**
 * @summary Specify which fields should be published by the postmetas publication
 * @array PostMetas.publishedFields.list
 */
PostMetas.publishedFields.list = PublicationsUtils.arrayToFields([
  "name",
  "description",
  "order",
  "slug",
  "image",
  "parentId",
]);