import React from 'react';
import {ListContainer} from "meteor/utilities:react-list-container";
import Categories from "meteor/nova:categories";
import LazyLoad from 'react-lazy-load';

const PostDetail = (document, currentUser) => {
    const post = document.post;
    const imageUrl = Posts.getDetailedPageImageUrl(post);
    var html = post.htmlBody;
    if (html) {
        html = '<p>' + html.replace('\n' + '\n', '</p><p>') + '...</p>';
    }
    const htmlBody = {__html: html};

    return (
      <section className="container_3tEOd post_detail_container">
          {/*post's image*/}
          <div>
              <div className="canvasWrapper_3pQxU">
                  <div className="canvas_3tuA5">
                      <div className="container_22rD3 post_image">
                          <LazyLoad height={315}>
                              <img className="placeholder_E_0qw" height="315" src={imageUrl} width="auto"/>
                          </LazyLoad>
                      </div>
                  </div>
              </div>
          </div>
          {/*post's content*/}
          <div className="post_page_body" dangerouslySetInnerHTML={htmlBody}/>
      </section>
    )
};

PostDetail.displayName = "PostDetail";

module.exports = PostDetail;
export default PostDetail;
