import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';
import {withRouter} from 'react-router'

class UserFolderProfileBackButtonSection extends Component {

    onBackToCollectionClick(){
        this.props.router.goBack();
    }

    render() {
        const user = this.props.user;
        const userName = Users.getDisplayName(user);

        return (
            <div className="collection-detail--action-buttons">
                <a className="collection-detail--backlink" href="https://www.producthunt.com/@trujunzhang/collections">
                    <span>
                        <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99875203,6.20445605 C6.88568897,5.53925334 7.60469343,5.89522409 7.60469343,6.99968461 L7.60469343,13.5003154 C7.60469343,14.6047107 6.88193573,14.9579317 5.99875203,14.295544 L2.21063483,11.454456 C1.32369788,10.7892533 1.32745112,9.70793173 2.21063483,9.04554395 L5.99875203,6.20445605 Z" transform="translate(-1 -5)" fill="#DA552F" fill-rule="evenodd"></path>
                        </svg>
                    </span>
                    {"Back to "+userName+"'s Collections"}</a>
                <a href="https://www.producthunt.com/@trujunzhang/collections/imessage-articles-collections-folder-djzhang-wanghao-trujunzhang-ios#" className="text_3Wjo0 subtle_1BWOT base_3CbW2">popular &nbsp;<span>
                        <svg width="8" height="5" viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.752 1.514C7.472.678 7.158 0 6.057 0H1.052C-.05 0-.332.654.426 1.46L2.38 3.54c.758.806 1.952.786 2.674-.054l1.698-1.972z" fill="#A8ACB3" fill-rule="evenodd"></path>
                        </svg>
                    </span>
                </a>
            </div>
        )
    }
}

UserFolderProfileBackButtonSection.propTypes = {
    user: React.PropTypes.object.isRequired
};

UserFolderProfileBackButtonSection.contextTypes = {
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object
};

UserFolderProfileBackButtonSection.displayName = "UserFolderProfileBackButtonSection";

module.exports = withRouter(UserFolderProfileBackButtonSection);
export default withRouter(UserFolderProfileBackButtonSection);
