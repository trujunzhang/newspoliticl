import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';

class UserFolderProfileHeaderUserAvatar extends Component {

    render() {
        const user = this.props.user;
        const avatarUrl = Users.avatar.getUrl(user);
        const avatar = avatarUrl
          ? <img className="placeholder_E_0qw placeholderHidden_pb7Bz" height="30" src={avatarUrl} width="30"/>
          : "";

        return (
          <span className="user-image">
                <div className="container_22rD3 user-image--image">
                    <div className="container__Ql6q lazyLoadContainer_3KgZD">
                        {avatar}
                    </div>
                </div>
            </span>
        )
    }
}

UserFolderProfileHeaderUserAvatar.propTypes = {
    user: React.PropTypes.object.isRequired
};

UserFolderProfileHeaderUserAvatar.contextTypes = {
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object
};

UserFolderProfileHeaderUserAvatar.displayName = "UserFolderProfileHeaderUserAvatar";

module.exports = UserFolderProfileHeaderUserAvatar;
