import React from 'react';
import {ListContainer} from "meteor/utilities:react-list-container";
import Categories from "meteor/nova:categories";

const PostDetail = (document, currentUser) => {
    const post = document.post;
    const thumbnailUrl = post.thumbnailUrl;
    const htmlBody = {__html: post.htmlBody};

    return (
      <section className="container_3tEOd post_detail_container">
          {/*post's image*/}
          <div>
              <div className="canvasWrapper_3pQxU">
                  <div className="canvas_3tuA5">
                      <div className="container_22rD3 post_image">
                          <img className="placeholder_E_0qw" height="315" src={thumbnailUrl} width="auto"/>
                      </div>
                  </div>
              </div>
          </div>
          {/*post's content*/}
          <div dangerouslySetInnerHTML={htmlBody}/>
      </section>
    )
};

PostDetail.displayName = "PostDetail";

module.exports = PostDetail;
export default PostDetail;
