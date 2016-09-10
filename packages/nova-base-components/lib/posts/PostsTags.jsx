import React from 'react';
import { Link } from 'react-router';

const PostsTags = ({post}) => {
  return (
    <div className="posts-categories">
      {post.tagsArray.map(tag =>
        <Link className="posts-category" key={tag._id} to={{pathname: "/", query: {tag: tag.slug}}}>{tag.name}</Link>
      )}
    </div>
  )
};

PostsTags.displayName = "PostsTags";

module.exports = PostsTags;