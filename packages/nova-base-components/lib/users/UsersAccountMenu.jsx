import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Dropdown, Button} from 'react-bootstrap';
import Posts from "meteor/nova:posts";

class UsersAccountMenu extends Component {
    showLogin() {
        this.context.messages.appStatus.showLoginUI();
    }

    render() {
        return (
          <a
            className="login_258vb header--login-button-legacy-tests-only secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2"
            onClick={this.showLogin.bind(this)}>Login</a>
        )
    }
}

UsersAccountMenu.contextTypes = {
    messages: React.PropTypes.object
};

UsersAccountMenu.displayName = "UsersAccountMenu";

module.exports = UsersAccountMenu;
export default UsersAccountMenu;