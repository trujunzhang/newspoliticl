import React, {PropTypes, Component} from 'react';
import {FormattedMessage, FormattedRelative} from 'react-intl';
import {Button} from 'react-bootstrap';
import moment from 'moment';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import {withRouter} from 'react-router'

class FoldersItem extends Component {

    render() {
        const folder = this.props.folder;

        return (
          <div className="postItem_2pV9v" rel="post-item-#74101">

              <a className="link_3fUGJ">
                  <div className="post-thumbnail thumbnail_JX64A thumbnail post-left-thumbnail">
                      <div className="container_22rD3 thumbnail">
                          {folder.thumbnailUrl ? <Telescope.components.PostsThumbnail post={folder}/> : null}
                      </div>
                  </div>

                  <div className="content_3oLx4">
                      <span onClick={this.popupDetail.bind(this)}
                            className="title_2p9fd featured_2W7jd default_tBeAo base_3CbW2 post-title">{folder.title}</span>
                      {this.renderAdminActions()}
                      <p style={{"margin-bottom": 10}} className="post_description"
                         onClick={this.popupDetail.bind(this)}>
                          {((mytextvar).length > maxlimit)
                            ? (((mytextvar).substring(0, maxlimit - 3)) + '...')
                            : mytextvar}</p>
                      {this.renderTags()}
                  </div>

              </a>

              {this.renderActionButtons(folder)}
          </div>
        )
    }
}

FoldersItem.propTypes = {
    post: React.PropTypes.object.isRequired
};

FoldersItem.contextTypes = {
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object
};

module.exports = withRouter(FoldersItem);
export default withRouter(FoldersItem);
