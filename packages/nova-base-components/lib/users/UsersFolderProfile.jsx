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
        const user = this.props.currentUser;
        const folder = this.props.document;
        const posts = folder.postsArray;
        return (
          <div>
              <Telescope.components.UserFolderProfileHeader user={user}/>
              <div className="constraintWidth_ZyYbM body_1RqUJ">
                  {this.renderTopPanel()}
                  {this.renderContent()}
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

