import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import {intlShape, FormattedMessage, FormattedRelative} from 'react-intl';
import Users from 'meteor/nova:users';

class CommentsItem extends Component {

    constructor() {
        super();
        ['showReply', 'replyCancelCallback', 'replySuccessCallback', 'showEdit', 'editCancelCallback', 'editSuccessCallback', 'deleteComment'].forEach(methodName => {
            this[methodName] = this[methodName].bind(this)
        });
        this.state = {
            showReply: false,
            showEdit: false
        };
    }

    showReply(event) {
        event.preventDefault();
        this.setState({showReply: true});
    }

    replyCancelCallback(event) {
        event.preventDefault();
        this.setState({showReply: false});
    }

    replySuccessCallback() {
        this.setState({showReply: false});
    }

    showEdit(event) {
        event.preventDefault();
        this.setState({showEdit: true});
    }

    editCancelCallback(event) {
        event.preventDefault();
        this.setState({showEdit: false});
    }

    editSuccessCallback() {
        this.setState({showEdit: false});
    }

    deleteComment() {

        const comment = this.props.comment;
        const deleteConfirmMessage = this.context.intl.formatMessage({id: "comments.delete_confirm"}, {body: Telescope.utils.trimWords(comment.body, 20)});
        const deleteSuccessMessage = this.context.intl.formatMessage({id: "comments.delete_success"}, {body: Telescope.utils.trimWords(comment.body, 20)});

        if (window.confirm(deleteConfirmMessage)) {
            this.context.actions.call('comments.deleteById', comment._id, (error, result) => {
                this.context.messages.flash(deleteSuccessMessage, "success");
                this.context.events.track("comment deleted", {'_id': comment._id});
            });
        }

    }

    renderComment() {
        const htmlBody = {__html: this.props.comment.htmlBody};

        return (
          <div className="body_221xI tech_Oe_Kz text_3Wjo0 default_tBeAo base_3CbW2">
              <div dangerouslySetInnerHTML={htmlBody}></div>
              {/*{!this.props.comment.isDeleted ?*/}
              {/*<a className="comments-item-reply-link" onClick={this.showReply}><Telescope.components.Icon*/}
              {/*name="reply"/> <FormattedMessage id="comments.reply"/></a> : null}*/}
          </div>
        )
    }

    renderReply() {

        return (
          <div className="comments-item-reply">
              <Telescope.components.CommentsNew
                postId={this.props.comment.postId}
                parentComment={this.props.comment}
                successCallback={this.replySuccessCallback}
                cancelCallback={this.replyCancelCallback}
                type="reply"
              />
          </div>
        )
    }

    renderEdit() {

        return (
          <Telescope.components.CommentsEdit
            comment={this.props.comment}
            successCallback={this.editSuccessCallback}
            cancelCallback={this.editCancelCallback}
          />
        )
    }

    //render() {
    //  const comment = this.props.comment;
    //
    //  return (
    //    <div className="comments-item" id={comment._id}>
    //      <div className="comments-item-body">
    //        <div className="comments-item-meta">
    //          <Telescope.components.UsersAvatar size="small" user={comment.user}/>
    //          <Telescope.components.UsersName user={comment.user}/>
    //          <div className="comments-item-date"><FormattedRelative value={comment.postedAt}/></div>
    //          <Telescope.components.CanDo action="comments.edit" document={this.props.comment}>
    //            <div>
    //              <a className="comment-edit" onClick={this.showEdit}><FormattedMessage id="comments.edit"/></a>
    //              <a className="comment-delete" onClick={this.deleteComment}><FormattedMessage id="comments.delete"/></a>
    //            </div>
    //          </Telescope.components.CanDo>
    //        </div>
    //        {this.state.showEdit ? this.renderEdit() : this.renderComment()}
    //      </div>
    //      {this.state.showReply ? this.renderReply() : null}
    //    </div>
    //  )
    //}

    renderBottomPanel() {
        const comment = this.props.comment;

        return (
          <div className="actions_3oz6g">
              <a rel="comment-upvote" href="#"
                 className="upvote_3Nd3Q action_Hv6P3 secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">
                  <span>
                    <svg width="9" height="8" viewBox="0 0 9 8" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9,8 L0,8 L4.5,0 L9,8 Z" fill="#999"></path>
                    </svg>
                  </span>
                  <span className="noVotesLabel_1gl1X">upvote</span>
              </a>
              <a
                className="tweet_3a9pw action_Hv6P3 secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2"
                rel="share-on-twitter" href="#">
                  <span>
                    <span>
                      <svg width="16px" height="13px" viewBox="0 0 16 13" version="1.1"
                           xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                        <path
                          d="M15.999,1.5367041 C15.4105184,1.79765391 14.7775382,1.97411998 14.1135589,2.05360469 C14.7910377,1.64718285 15.3115215,1.00430648 15.5570138,0.237953855 C14.9225336,0.613881561 14.2200556,0.887328975 13.472579,1.03430071 C12.8735977,0.39642338 12.0206243,-0.002 11.0766538,-0.002 C9.26371048,-0.002 7.7942564,1.46721746 7.7942564,3.27986887 C7.7942564,3.53731936 7.82325549,3.7877712 7.87925374,4.02772505 C5.15133899,3.89075139 2.73241458,2.58400269 1.11346517,0.598384541 C0.830974001,1.08329129 0.668979063,1.64668295 0.668979063,2.2485672 C0.668979063,3.3873482 1.24846095,4.39165507 2.12943342,4.98054182 C1.59145024,4.96354509 1.08546605,4.81607345 0.642479891,4.57012075 C0.641979907,4.58361815 0.641979907,4.59761546 0.641979907,4.61161277 C0.641979907,6.20180696 1.77344455,7.52805191 3.27489763,7.82949394 C2.99940624,7.90447952 2.7094153,7.94447183 2.40992466,7.94447183 C2.19843127,7.94447183 1.99293769,7.92397577 1.79244395,7.88548318 C2.20993091,9.18923246 3.42239302,10.13805 4.85884813,10.1645449 C3.73538324,11.0448756 2.31992747,11.5692748 0.781975532,11.5692748 C0.516983813,11.5692748 0.255991969,11.5537777 -0.001,11.5232836 C1.45145461,12.4546045 3.17690069,12.998 5.03084275,12.998 C11.0686541,12.998 14.3700509,7.99696174 14.3700509,3.65979581 C14.3700509,3.51732321 14.367051,3.37585041 14.3605512,3.23537743 C15.0020312,2.77246645 15.5585138,2.19457758 15.9985,1.5367041 L15.999,1.5367041 Z"
                          id="twitter"
                          fill="#000000"></path>
                      </svg>
                    </span>
                    <span className="shareLabel_2yYck">tweet</span>
                  </span>
              </a>
              <a
                className="facebook_1qw8K action_Hv6P3 secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2"
                rel="share-on-facebook" href="#">
                  <span>
                    <span>
                      <svg width="8" height="13" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.2 2.323H5.923c-1.046 0-1.278.464-1.278 1.16V5.11h2.44l-.35 2.438h-2.09v6.387H2.09V7.548H0V5.11h2.09V3.252C2.09 1.162 3.368 0 5.342 0c.93 0 1.742.116 1.858.116v2.207z"
                          fill="#FFF" ></path>
                      </svg>
                    </span>
                    <span className="shareLabel_2yYck">share</span>
                  </span>
              </a>
              <a
                className="timestamp_28Wws secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">
                  <time title="2016-08-28T10:07:27.716-07:00" datetime="2016-08-28T10:07:27.716-07:00">
                      <FormattedRelative value={comment.postedAt}/>
                  </time>
              </a>
          </div>
        )
    }

    render() {
        const comment = this.props.comment;

        return (
          <div >
              <Telescope.components.UsersAvatar size="small" user={comment.user}/>

              <div className="heading_3axGt">
                  <Telescope.components.UsersName user={comment.user}/>
              </div>
              <Telescope.components.CanDo action="comments.edit" document={this.props.comment}>
                  <div style={{"margin-top": -10}}>
                      <a className="comment-edit" onClick={this.showEdit}><FormattedMessage id="comments.edit"/></a>
                      <a className="comment-delete" onClick={this.deleteComment}><FormattedMessage
                        id="comments.delete"/></a>
                  </div>
              </Telescope.components.CanDo>

              {/*{this.renderComment()}*/}
              {this.state.showEdit ? this.renderEdit() : this.renderComment()}

              {/*{this.state.showReply ? this.renderReply() : null}*/}
              {this.renderBottomPanel()}
          </div>
        )
    }

}

CommentsItem.propTypes = {
    comment: React.PropTypes.object.isRequired, // the current comment
    //currentUser: React.PropTypes.object, // the current user
};

CommentsItem.contextTypes = {
    currentUser: React.PropTypes.object,
    actions: React.PropTypes.object,
    messages: React.PropTypes.object,
    events: React.PropTypes.object,
    intl: intlShape
};

module.exports = CommentsItem;
