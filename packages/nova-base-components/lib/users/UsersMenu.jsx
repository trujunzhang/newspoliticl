import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/std:accounts-ui';
import {Modal, Dropdown, MenuItem} from 'react-bootstrap';
import {ContextPasser} from "meteor/nova:core";
import {LinkContainer} from 'react-router-bootstrap';
import Users from 'meteor/nova:users';

class UsersMenu extends Component {

  popoverUserMenus() {
    var button = this.refs.userProfile;
    var top = button.y;
    var left = button.x;
    var width = button.width;
    var height = button.height;
    var type = "LoggedUserMenu";
    this.context.messages.showPopoverMenu(top, left, width, height, type);
  }

  render() {

    const user = this.props.user;

    return (
      <div className="account_FReak">
        <a className="addPostButton_2U4Gx menuLink_1h9ZN" href="/faq#how-do-i-submit-things-to-product-hunt">
            <span>
              <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M8,10 L8,4 L6,4 L6,10 L0,10 L0,12 L6,12 L6,18 L8,18 L8,12 L14,12 L14,10 L8,10 Z"
                      transform="translate(0 -4)" fill="#999" fill-rule="evenodd"></path>
              </svg>
            </span>
        </a>
        <a href="#" className="activityFeedButton_1xqM_ menuLink_1h9ZN">
            <span className="secondaryText_PM80d default_tBeAo base_3CbW2">
              <span>
                <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M37,16 L33,16 C33,17.1 33.9,18 35,18 C36.1,18 37,17.1 37,16 Z M41.125,13.3076923 L40.6875,13.3076923 C40.075,12.7153846 39.375,11.8692308 39.375,10.7692308 L39.375,8.23076923 C39.375,5.86153846 37.45,4 35,4 C32.55,4 30.625,5.86153846 30.625,8.23076923 L30.625,10.7692308 C30.625,11.8692308 29.925,12.7153846 29.3125,13.3076923 L28.875,13.3076923 C28.35,13.3076923 28,13.6461538 28,14.1538462 C28,14.6615385 28.35,15 28.875,15 L41.125,15 C41.65,15 42,14.6615385 42,14.1538462 C42,13.6461538 41.65,13.3076923 41.125,13.3076923 Z"
                    transform="translate(-28 -4)"
                    fill="#999"
                    fill-rule="evenodd"></path>
                </svg>
              </span>
            </span>
        </a>
        <a className="userMenu_3flqi" data-test="user-menu" onClick={this.popoverUserMenus.bind(this)}>
            <span className="user-image">
              <div className="container_22rD3 user-image--image user_avator">
                <div className="container__Ql6q lazyLoadContainer_3KgZD">
                  <img ref="userProfile"
                       height="32"
                       src="https://ph-avatars.imgix.net/641022/original?auto=format&amp;codec=mozjpeg&amp;cs=strip&amp;w=32&amp;h=32&amp;fit=crop"
                       srcset="https://ph-avatars.imgix.net/641022/original?auto=format&amp;codec=mozjpeg&amp;cs=strip&amp;w=32&amp;h=32&amp;fit=crop&amp;dpr=2 2x, https://ph-avatars.imgix.net/641022/original?auto=format&amp;codec=mozjpeg&amp;cs=strip&amp;w=32&amp;h=32&amp;fit=crop&amp;dpr=3 3x"
                       width="32"/>
                </div>
              </div>
            </span>
        </a>
      </div>
    )
  }

}

UsersMenu.propTypes = {
  user: React.PropTypes.object
};

UsersMenu.contextTypes = {
  messages: React.PropTypes.object
};

module.exports = UsersMenu;
export default UsersMenu;