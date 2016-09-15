import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router'

const PostsCategories = (props) => {

    const query = _.clone(props.router.location.query);
    const post = props.post;

    return (
      <div className="posts-categories">
          {post.categoriesArray.map(category =>
            <Link className="posts-category" key={category._id}
                  to={{pathname: "/", query: {...query, cat: category.slug}}}>{category.name}</Link>
          )}
      </div>
    )
};

PostsCategories.displayName = "PostsCategories";

module.exports = withRouter(PostsCategories);