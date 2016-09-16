import React from 'react';
import Posts from "meteor/nova:posts";
import LazyLoad from 'react-lazy-load';

const PostsThumbnail = ({post}) => {

    return (

      <div className="container__Ql6q lazyLoadContainer_3KgZD">
          <LazyLoad width={100} height={100}>
              <img
                width="100" height="100"
                src={Posts.getThumbnailUrl(post)}
                className="attachment-thumbnail size-thumbnail wp-post-image"
                alt={post.title}
                title={post.title}/>
          </LazyLoad>
      </div>
    )
};

PostsThumbnail.displayName = "PostsThumbnail";

module.exports = PostsThumbnail;
export default PostsThumbnail;