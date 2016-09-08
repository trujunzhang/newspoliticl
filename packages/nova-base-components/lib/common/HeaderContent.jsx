import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/std:accounts-ui';
import {Modal, Dropdown, MenuItem} from 'react-bootstrap';
import {ContextPasser} from "meteor/nova:core";
import {LinkContainer} from 'react-router-bootstrap';
import Users from 'meteor/nova:users';
import Posts from "meteor/nova:posts";

class HeaderContent extends Component {

    showPopoverMenu() {
        var button = this.refs.moreButton;
        var top = button.offsetTop;
        var left = button.offsetLeft;
        var width = button.offsetWidth;
        var height = button.offsetHeight;
        var type = "MoreButton";
        this.context.messages.showPopoverMenu(top, left, width, height, type);
    }

    render() {
        const currentUser = this.props.currentUser;
        return (
          <div className="headerContent_3umLL centerItems_222KX">
              <div className="headerLeft_1Kke2 centerItems_222KX">
                  <a className="logo_5Pf3F" href="/">
                      <span
                        className="logoIcon_1Mp0b">
                          <svg width="40" height="40" viewBox="0 0 40 40"
                               xmlns="http://www.w3.org/2000/svg">
                              <g fill="none"
                                 fill-rule="evenodd">
                                  <path
                                    d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20"
                                    fill="#DA552F"></path>
                                  <path
                                    d="M22.667 20H17v-6h5.667c1.656 0 3 1.343 3 3s-1.344 3-3 3m0-10H13v20h4v-6h5.667c3.866 0 7-3.134 7-7s-3.134-7-7-7"
                                    fill="#FFF"></path>
                              </g>
                          </svg>
                      </span>
                  </a>
                  <Telescope.components.HeaderSearchForm />
              </div>
              <div className="headerRight_2DQLQ centerItems_222KX">
                  <a onClick={this.showPopoverMenu.bind(this)} className="metaMenu_3AKjk menuLink_1h9ZN"
                     data-test="more" ref="moreButton">
                      <span>
                          <svg width="20" height="4"
                               viewBox="0 0 20 4"
                               xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M2 4c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm8 0c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm8 0c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z"
                                fill="#BBB" fill-rule="evenodd"></path>
                          </svg>
                      </span>
                  </a>
                  {currentUser ? <Telescope.components.UsersMenu user={currentUser}/> :
                    <Telescope.components.UsersAccountMenu/>}
              </div>
          </div>
        )
    }

}

HeaderContent.contextTypes = {
    messages: React.PropTypes.object
};

module.exports = HeaderContent;
export default HeaderContent;