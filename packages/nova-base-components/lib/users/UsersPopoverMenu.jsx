import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/std:accounts-ui';
import {Modal, Dropdown, MenuItem} from 'react-bootstrap';
import {ContextPasser} from "meteor/nova:core";
import {LinkContainer} from 'react-router-bootstrap';
import Users from 'meteor/nova:users';

class UsersPopoverMenu extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('click', this.hide.bind(this), true)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hide.bind(this), true)
    }

    hide() {
        this.context.messages.dismissPopoverMenu();
    }

    logout() {
        Meteor.logout(Accounts.ui._options.onSignedOutHook())
    }

    render() {

        const user = this.props.user;

        const comp = this.props.comp;
        const top = comp.top + comp.height + 26;
        const left = (comp.left + comp.width / 2) - 75;

        const loggedUserMenu = [
            {"href": "/users/" + user.telescope.slug, "title": "MY PROFILE"},
            {"href": "/games", "title": "MY COLLECTIONS"},
            {"href": "/podcasts", "title": "INVITES(0)"},
            {"href": "/books", "title": "SETTINGS"},
            {"href": "/topics/developer-tools", "title": "API DASHBOARD"},
            {"href": "/topics/photography-tools", "title": "LOGOUT"}
        ];

        return (
          <div className="popover v-bottom-center" style={{top: top, left: left}}>
              <ul className="content_2mq4P">
                  {loggedUserMenu.map((menu, key) => {
                      if (menu.title == "LOGOUT") {
                          return (
                            <li
                              className="option_2XMGo secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">
                                <a onClick={
                                    this.logout.bind(this)
                                }>{menu.title}</a>
                            </li>
                          )
                      } else {
                          return (
                            <li
                              className="option_2XMGo secondaryBoldText_1PBCf secondaryText_PM80d subtle_1BWOT base_3CbW2">
                                <a href={menu.href}>{menu.title}</a>
                            </li>
                          )
                      }
                  })}
              </ul>
          </div>
        )
    }

}

UsersPopoverMenu.propTypes = {
    user: React.PropTypes.object
};

UsersPopoverMenu.contextTypes = {
    messages: React.PropTypes.object
};

module.exports = UsersPopoverMenu;
export default UsersPopoverMenu;