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
          <div className="backgroundImage_1hK9M card_2nuIG card_3kZOV">
              <a className="link_1QbEt"
                 href="https://www.producthunt.com/@trujunzhang/collections/imessage-articles-collections-folder-djzhang-wanghao-trujunzhang-ios"><span
                className="name_3GvIR featured_2W7jd inverse_1CN6F base_3CbW2">imessage articles collections folder djzhang wanghao trujunzhang ios</span><span
                className="title__hjS3 text_3Wjo0 inverse_1CN6F base_3CbW2"></span></a>
              <button className="button_2I1re smallSize_1da-r secondaryText_PM80d simpleVariant_1Nl54 follow_3OEqn">
                  <div className="buttonContainer_wTYxi">Follow</div>
              </button>
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
