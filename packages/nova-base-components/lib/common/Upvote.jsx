import React, {PropTypes, Component} from 'react';
//import Actions from "../actions.js";
//import { Messages } from "meteor/nova:core";
import classNames from 'classnames';
import Users from 'meteor/nova:users';

class Upvote extends Component {

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
        const user = this.context.currentUser;

        const hasUpvoted = Users.hasUpvoted(user, post);
        const hasDownvoted = Users.hasDownvoted(user, post);
        const actionsClass = classNames(
          "vote",
          {voted: hasUpvoted || hasDownvoted},
          {upvoted: hasUpvoted},
          {downvoted: hasDownvoted}
        );

        const buttonClass = hasUpvoted ? "button_2I1re active_2heMV smallSize_1da-r secondaryText_PM80d simpleVariant_1Nl54 button_2n20W" :
          "button_2I1re smallSize_1da-r secondaryText_PM80d simpleVariant_1Nl54 button_2n20W";

        const postVoteClass = "postUpvoteArrow_2xABl" + (hasUpvoted ? " upvoted_172lX animate_asuDN" : "");

        return (
          <button className={buttonClass} rel="vote-button" onClick={this.onUpvoteClick.bind(this)}>
              <div className="buttonContainer_wTYxi">
                  <div className={postVoteClass}></div>
                  {post.upvotes || 0}
              </div>
          </button>
        )
    }
}

Upvote.propTypes = {
    post: React.PropTypes.object.isRequired, // the current post
    // currentUser: React.PropTypes.object, // the current user
};

Upvote.contextTypes = {
    currentUser: React.PropTypes.object,
    actions: React.PropTypes.object,
    events: React.PropTypes.object,
    messages: React.PropTypes.object
};

module.exports = Upvote;
export default Upvote;