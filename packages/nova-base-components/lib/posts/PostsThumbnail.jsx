import React from 'react';
import Posts from "meteor/nova:posts";

const PostsThumbnail = ({post}) => {


    return (

      <div className="container__Ql6q lazyLoadContainer_3KgZD">
          <img
            width="100" height="100"
            src={Posts.getThumbnailUrl(post)}
            className="attachment-thumbnail size-thumbnail wp-post-image"
            alt={post.title}
            title={post.title}/>
      </div>
    )
};

PostsThumbnail.displayName = "PostsThumbnail";

module.exports = PostsThumbnail;
export default PostsThumbnail;