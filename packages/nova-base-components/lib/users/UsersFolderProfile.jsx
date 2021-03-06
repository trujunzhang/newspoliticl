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
    onBackToCollectionClick() {
        const userName = Users.getDisplayName(this.props.currentUser);
        const path = "/users/" + userName + "/collections";
        this.props.router.push({pathname: path});
    }

    render() {
        const currentUser = this.props.currentUser;
        const folder = this.props.document;
        //const posts = folder.postsArray;

        return (
          <div className="collection-detail">
              {/*header section*/}
              <Telescope.components.UserFolderProfileHeader user={currentUser}
                                                            folder={folder}
                                                            callBack={this.onBackToCollectionClick.bind(this)}/>
              <div className="container">
                  <div className="constraintWidth_ZyYbM">
                      {/*back button section*/}
                      <Telescope.components.UserFolderProfileBackButtonSection user={currentUser}
                                                                               callBack={this.onBackToCollectionClick.bind(this)}/>
                      <ListContainer
                        collection={Posts}
                        publication="posts.list"
                        selector={{}}
                        options={{}}
                        terms={{folderId: folder._id}}
                        joins={Posts.getJoins()}
                        component={Telescope.components.FolderPostsList}
                        cacheSubscription={false}
                        listId={"user.folder.posts.list"}
                        limit={0}
                      />
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

