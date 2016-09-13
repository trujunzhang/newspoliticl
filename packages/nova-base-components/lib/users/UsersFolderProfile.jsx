import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {ListContainer} from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import {Link} from 'react-router';
import {withRouter} from 'react-router'
import Folders from "meteor/nova:folders";

class UsersFolderProfile extends Component {

    renderTopPanel() {
        return (
          <div>renderTopPanel</div>
        )
    }

    renderContent() {
        return (
          <div>renderTopPanel</div>
        )
    }

    render() {
        const currentUser = this.props.currentUser;
        const folder = this.props.document;
        const posts = folder.postsArray;

        return (
          <div className="collection-detail">
              {/*header section*/}
              <Telescope.components.UserFolderProfileHeader user={currentUser} folder={folder}/>
              <div className="collection-detail--subnav"></div>
              <div className="container">
                  <div className="constraintWidth_ZyYbM container_3aBgK">
                      {/*back button section*/}
                      <Telescope.components.UserFolderProfileBackButtonSection user={currentUser}/>
                      <ul className="postsList_2tOc7">
                          {posts.map(post =>
                            <li>
                                <Telescope.components.PostsItem post={post}
                                                                currentUser={currentUser}
                                                                key={post._id}/>
                            </li>
                          )}
                      </ul>
                  </div>
              </div>
          </div>
        )
    }
}

UsersFolderProfile.propTypes = {
    user: React.PropTypes.object.isRequired
};

UsersFolderProfile.contextTypes = {
    currentUser: React.PropTypes.object
};

UsersFolderProfile.displayName = "UsersFolderProfile";

module.exports = withRouter(UsersFolderProfile);
export default withRouter(UsersFolderProfile);

