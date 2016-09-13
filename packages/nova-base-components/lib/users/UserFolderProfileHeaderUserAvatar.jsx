import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';

class UserFolderProfileHeaderUserAvatar extends Component {

    render() {
        const user = this.props.user;
        //const avatarUrl = Users.avatar.getUrl(user);
        //const avatar = avatarUrl
        //    ? <img height="140" width="140" src={avatarUrl}/>
        //    : "";
        //
        //const upvotedPosts = user.telescope.upvotedPosts;
        //const collections = 0;

        return (
            <span className="user-image">
                <div className="container_22rD3 user-image--image">
                    <div className="container__Ql6q lazyLoadContainer_3KgZD"><img height="30" src="./Product Hunt_files/original(2)" srcset="https://ph-avatars.imgix.net/641022/original?auto=format&amp;codec=mozjpeg&amp;cs=strip&amp;w=30&amp;h=30&amp;fit=crop&amp;dpr=2 2x, https://ph-avatars.imgix.net/641022/original?auto=format&amp;codec=mozjpeg&amp;cs=strip&amp;w=30&amp;h=30&amp;fit=crop&amp;dpr=3 3x" width="30"/>
                    </div>
                    <img className="placeholder_E_0qw placeholderHidden_pb7Bz" height="30" src="./Product Hunt_files/original(1)" width="30"/>
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
