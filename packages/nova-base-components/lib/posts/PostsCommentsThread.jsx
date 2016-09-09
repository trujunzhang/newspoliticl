import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {ListContainer} from "meteor/utilities:react-list-container";
import {ModalTrigger} from "meteor/nova:core";
import Comments from "meteor/nova:comments";
import Posts from "meteor/nova:posts";

class PostsCommentsThread extends Component {

    onLoginClick() {
        this.context.messages.appStatus.showLoginUI();
    }

    rendLoginUI() {
        return (
          <div className="access_5Hx8h notice_CT78V box_2b3oc text_3Wjo0 subtle_1BWOT base_3CbW2">
        <span>Commenting is limited to those invited by others in the community.
          <br/>
        </span>
              <a onClick={this.onLoginClick.bind(this)}>Login to continue.</a>
          </div>
        )
    }

    renderCommentForm() {
        const post = this.props.document;
        return (
          <div className="posts-comments-thread-new">
              <h4><FormattedMessage id="comments.new"/></h4>
              <Telescope.components.CommentsNew type="comment" postId={post._id}/>
          </div>
        )
    }

    render() {
        const post = this.props.document;
        const currentUser = this.props.currentUser;

        return (
          <div className="discussion_cr2q_">
              <h2 className="heading_2TFm8 heading_AsD8K title_2vHSk subtle_1BWOT base_3CbW2">Discussion</h2>
              <a className="sortToggle_3nVmh text_3Wjo0 subtle_1BWOT base_3CbW2" href="#">most upvoted
                  <span className="icon_2JDiK">
                      <svg width="8" height="5" viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.752 1.514C7.472.678 7.158 0 6.057 0H1.052C-.05 0-.332.654.426 1.46L2.38 3.54c.758.806 1.952.786 2.674-.054l1.698-1.972z"
                          fill="#A8ACB3" ></path>
                      </svg>
                  </span>
              </a>
              <div>
                  <ListContainer
                    collection={Comments}
                    publication="comments.list"
                    selector={{postId: post._id}}
                    terms={{postId: post._id, view: "postComments"}}
                    limit={0}
                    parentProperty="parentCommentId"
                    joins={Comments.getJoins()}
                    component={Telescope.components.CommentsList}
                    listId="comments.list"
                  />
              </div>
              { currentUser ? this.renderCommentForm() : this.rendLoginUI()}
          </div>
        )
    }
}

PostsCommentsThread.contextTypes = {
    messages: React.PropTypes.object
};

PostsCommentsThread.displayName = "PostsCommentsThread";

module.exports = PostsCommentsThread;
export default PostsCommentsThread;