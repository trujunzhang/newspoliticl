import React, {PropTypes, Component} from 'react';
//import Actions from "../actions.js";
//import { Messages } from "meteor/nova:core";
import classNames from 'classnames';
import Users from 'meteor/nova:users';

class ArticleUpvote extends Component {

    constructor(props) {
        super(props);
    }

    onUpvoteClick(e) {
        e.preventDefault();

        const post = this.props.post;
        const user = this.context.currentUser;

        if (!user) {
            this.context.messages.flash("Please log in first");
        } else if (user.hasUpvoted(post)) {
            this.context.actions.call('posts.cancelUpvote', post._id, () => {
                this.context.events.track("post upvote cancelled", {'_id': post._id});
            });
        } else {
            this.context.actions.call('posts.upvote', post._id, () => {
                this.context.events.track("post upvoted", {'_id': post._id});
            });
        }

    }

    render() {
        const post = this.props.post;
        return (
          <a onClick={this.onUpvoteClick.bind(this)}
             className="post-vote-button v-inlined v-category-tech postVoteButton_WsFJU button_2I1re solidVariant_2wWrf mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d whiteSolidColor_18W4g">
                                    <span className="post-vote-button--arrow">
                                        <svg width="9" height="8" viewBox="0 0 9 8" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 8H0l4.5-8L9 8z" fill="#000"></path>
                                        </svg>
                                    </span>
              <span className="post-vote-button--count">
                  {post.upvotes || 0}
              </span>
          </a>
        )
    }
}

ArticleUpvote.propTypes = {
    post: React.PropTypes.object.isRequired, // the current post
    // currentUser: React.PropTypes.object, // the current user
};

ArticleUpvote.contextTypes = {
    currentUser: React.PropTypes.object,
    actions: React.PropTypes.object,
    events: React.PropTypes.object,
    messages: React.PropTypes.object
};

module.exports = ArticleUpvote;
export default ArticleUpvote;