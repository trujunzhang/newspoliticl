import React, {PropTypes, Component} from 'react';
import Posts from "meteor/nova:posts";

class PostsPage extends Component {

    renderTags() {
        const post = this.props.document;
        return post.tagsArray ? <Telescope.components.PostsTags post={post}/> : "";
    }

    render() {

        const post = this.props.document;
        const currentUser = this.props.currentUser;
        const htmlBody = {__html: post.htmlBody};

        return (
          <div className="content_3X9xi">

              <div className="container_2uJxj">
                  <section className="postSection_1iIbk">
                      <div className="sectionContent_21Amp">
                          {/* Top top */}
                          <div>
                              {/*header block*/}
                              <Telescope.components.PostsSingleHeader post={post} user={currentUser}/>
                          </div>
                          <div className="constraintWidth_ZyYbM body_1a08C">
                              <main className="main_3lfDa">
                                  {/*post's tags*/}
                                  {this.renderTags()}
                                  {/*middle left*/}
                                  <Telescope.components.PostDetail post={post} user={currentUser}/>
                                  {/*comments*/}
                                  <Telescope.components.PostsCommentsThread document={post} currentUser={currentUser}/>
                              </main>
                          </div>
                      </div>
                  </section>
                  <section className="popularTodaySection_30n6J">
                      <div className="sectionContent_21Amp">


                      </div>
                  </section>
              </div>

          </div>
        )
    }
}

PostsPage.displayName = "PostsPage";

module.exports = PostsPage;
export default PostsPage;