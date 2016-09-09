import PublicationUtils from 'meteor/utilities:smart-publications';
import Posts from "meteor/nova:posts";
import Comments from "meteor/nova:comments";

// ------------------------------------- Posts -------------------------------- //

Posts.addField([

    /**
     How many upvotes the post has received
     */
    {
        fieldName: "tags",
        fieldSchema: {
            type: [String],
            optional: true,
            publish: true,
            defaultValue: []
        }
    },
]);

PublicationUtils.addToFields(Posts.publishedFields.list, ["tags"]);
