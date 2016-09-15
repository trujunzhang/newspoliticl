import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router'

const PostsTags = (props) => {

    const query = _.clone(props.router.location.query);
    const post = props.post;

    return (
      <div className="posts-categories">
          {post.tagsArray.map(tag =>
            <Link className="posts-category" key={tag._id}
                  to={{pathname: "/", query: {...query, tag: tag.slug}}}>
                {tag.name}
            </Link>
          )}
      </div>
    )
};

PostsTags.displayName = "PostsTags";

module.exports = withRouter(PostsTags);