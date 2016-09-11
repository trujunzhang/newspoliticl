import React, {PropTypes, Component} from 'react';
import {FormattedMessage, FormattedRelative} from 'react-intl';
import {Button} from 'react-bootstrap';
import moment from 'moment';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import {withRouter} from 'react-router'
//import HtmlToReact from 'html-to-react';

const delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

class PostsItem extends Component {

    renderCategories() {
        return this.props.post.categoriesArray ? <Telescope.components.PostsCategories post={this.props.post}/> : "";
    }

    renderTags() {
        return this.props.post.tagsArray ? <Telescope.components.PostsTags post={this.props.post}/> : "";
    }

    renderAdminActions() {
        return (
          <div className="post-actions">
              <Telescope.components.CanDo
                action="posts.edit.all"
                document={this.props.post}>

                  <div>
                      {this.renderCategories()}

                      {/*button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidVariant_2wWrf btn btn-default*/}
                      <ModalTrigger title="Edit Post"
                                    component={
                                        <a
                                          className="posts-action-edit button_2I1re  secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidVariant_2wWrf btn btn-default">
                                            <FormattedMessage id="posts.edit"/></a>}>
                          <Telescope.components.PostsEditForm post={this.props.post}/>
                      </ModalTrigger>
                  </div>
              </Telescope.components.CanDo>
          </div>
        )
    }

    renderCommenters() {
        return this.props.post.commentersArray
          ? <Telescope.components.PostsCommenters post={this.props.post} event={this.popupDetail.bind(this)}/>
          : null;
    }

    renderActionButtons(post) {
        return (
          <div className="meta_2lIV-">
              <div className="actionButtons_2mJsw">
                  <Telescope.components.Vote post={post}
                                             currentUser={this.context.currentUser}/> {this.renderCommenters()}
                  <div className="additionalActionButtons_BoErh">
                      <a
                        className="button_2I1re smallSize_1da-r secondaryText_PM80d subtleVariant_tlhj3 simpleVariant_1Nl54 button_2n20W"
                        rel="saveButton" label="save" onClick={this.onSaveButtonClick.bind(this, post)}>
                          <div className="buttonContainer_wTYxi">
                                <span>
                                    <span>
                                        <svg width="13" height="10" viewBox="0 0 13 10"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                              d="M9,6 L6,6 L6,7 L9,7 L9,10 L10,10 L10,7 L13,7 L13,6 L10,6 L10,3 L9,3 L9,6 Z M0,0 L8,0 L8,1 L0,1 L0,0 Z M0,3 L8,3 L8,4 L0,4 L0,3 Z M0,6 L5,6 L5,7 L0,7 L0,6 Z"
                                              fill="#FFF"></path>
                                        </svg>
                                    </span>
                                    save
                                </span>
                          </div>
                      </a>
                      <a
                        className="button_2I1re smallSize_1da-r secondaryText_PM80d subtleVariant_tlhj3 simpleVariant_1Nl54 button_2n20W"
                        target="_blank" href="/r/a7b2435b0265fd/74101">
                          <div className="buttonContainer_wTYxi">
                                <span>
                                    <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                          d="M5.9816,1.0418 L8.2136,1.0418 L3.8976,5.3578 L4.6426,6.1018 L8.9586,1.7858 L8.9586,4.0188 L9.9996,4.0188 L9.9996,0.5208 C9.9996,0.2228 9.7766,-0.0002 9.4786,-0.0002 L5.9816,-0.0002 L5.9816,1.0418 Z M9,9 L1,9 L1,1 L3.97833252,1 L3.97833252,0 L0.51,0 C0.228,0 0,0.228 0,0.51 L0,9.49 C0,9.772 0.228,10 0.51,10 L9.49,10 C9.772,10 10,9.772 10,9.49 L10,6.02606201 L9,6.02606201 L9,9 Z"
                                          fill="#FFF"></path>
                                    </svg>
                                </span>
                          </div>
                      </a>
                  </div>
              </div>
              <div className="annotations_X03xJ annotations_2Ditj">
                  <div className="secondaryText_PM80d subtle_1BWOT base_3CbW2">
                      <span >🏆</span>
                      #1 in Tech
                  </div>
              </div>
              <div className="associations_2dmvY">
                  <div>
                      <a
                        className="button_2I1re smallSize_1da-r secondaryText_PM80d greySolidColor_270pZ solidVariant_2wWrf"
                        onClick={this.onAuthorClick.bind(this, post.author)}>
                          <div className="buttonContainer_wTYxi">{post.author}</div>
                      </a>
                  </div>
              </div>
          </div>
        )
    }

    popupDetail() {
        const post = this.props.post;
        // /posts/${post._id}/${post.slug}
        const path = "/?postid=" + post._id + "&title=" + post.slug;
        const messages = this.context.messages;
        const postId = post._id;

        messages.pushAndPostShow(postId);

        const router = this.props.router;
        delay(() => {
            router.push({pathname: path});
        }, 10);
    }

    render() {

        const post = this.props.post;

        // console.log(post)
        // console.log(post.user)

        const mytextvar = post.excerpt;
        const maxlimit = 150;

        return (
          <div className="postItem_2pV9v" rel="post-item-#74101">

              <a className="link_3fUGJ">
                  <div className="post-thumbnail thumbnail_JX64A thumbnail post-left-thumbnail">
                      <div className="container_22rD3 thumbnail">
                          {post.thumbnailUrl ? <Telescope.components.PostsThumbnail post={post}/> : null}
                      </div>
                  </div>

                  <div className="content_3oLx4">
                      <span onClick={this.popupDetail.bind(this)}
                            className="title_2p9fd featured_2W7jd default_tBeAo base_3CbW2 post-title">{post.title}</span>
                      {this.renderAdminActions()}
                      <p style={{"margin-bottom": 10}} className="post_description"
                         onClick={this.popupDetail.bind(this)}>
                          {((mytextvar).length > maxlimit)
                            ? (((mytextvar).substring(0, maxlimit - 3)) + '...')
                            : mytextvar}</p>
                      {this.renderTags()}
                  </div>

              </a>

              {this.renderActionButtons(post)}
          </div>
        )
    }

    onTagClick(tag) {
        const router = this.props.router;
        router.push({pathname: "/", query: {tag: tag}});
    };

    onAuthorClick(author) {
        console.log(author);
    }

    onSaveButtonClick(post) {
        var button = this.refs.saveButton;
        var top = button.offsetTop;
        var left = button.offsetLeft;
        var width = button.offsetWidth;
        var height = button.offsetHeight;
        var type = "SaveButton";
        this.context.messages.showPopoverMenu(top, left, width, height, type);
    }
}

PostsItem.propTypes = {
    post: React.PropTypes.object.isRequired
};

PostsItem.contextTypes = {
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object
};

module.exports = withRouter(PostsItem);
export default withRouter(PostsItem);
