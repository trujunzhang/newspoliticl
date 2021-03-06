import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/std:accounts-ui';
import {Modal, Dropdown, MenuItem} from 'react-bootstrap';
import {ContextPasser} from "meteor/nova:core";
import {LinkContainer} from 'react-router-bootstrap';
import Users from 'meteor/nova:users';
import {withRouter} from 'react-router'

class HeaderNavigation extends Component {

    constructor(props) {
        super(props);
    }

    onNavItemClick(cat) {
        const router = this.props.router;
        const query = _.clone(router.location.query);
        router.push({pathname: "/", query: {...query, cat: cat.slug}});
    }

    onHomeItemClick() {
        const router = this.props.router;
        router.push({pathname: '/'});
    }

    render() {
        const {categories, router} = this.props;

        const currentCategorySlug = router.location.query.cat;

        const normalClass = "item_1k3Lx";
        const activeClass = "item_1k3Lx itemActive_3HLKr item_1k3Lx";

        return (
          <nav className="navigation_1H-Yv text_3Wjo0 subtle_1BWOT base_3CbW2">
              <a className={currentCategorySlug ? normalClass : activeClass} onClick={this.onHomeItemClick.bind(this)}>Home</a>
              <div className="subNavigation_iLJXz">
                  <div className="gradientLeft_33bxf gradient_fDMJD"></div>
                  <div className="gradientRight_Rp6ob gradient_fDMJD"></div>
                  <ol>
                      {categories && categories.length > 0 ? categories.map((cat, index) => {
                            return (
                              <li key={index}>
                                  <a className={currentCategorySlug === cat.slug ? activeClass : normalClass}
                                     onClick={this.onNavItemClick.bind(this, cat)}>{cat.name}</a>
                              </li>
                            )
                        }
                      ) : null}
                      <li>
                          <a className="all_P8Pm- item_1k3Lx secondaryText_PM80d default_tBeAo base_3CbW2"
                             href="/topics">See all</a>
                      </li>
                  </ol>
              </div>
              <div className="arrows_3W6MJ">
                  <a className="arrowLeft_2dYJG arrow__5txj" disabled="">
                      <span>
                          <svg width="9"
                               height="16"
                               viewBox="0 0 9 16"
                               xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M1.05833636,0 L0,1.05654696 L6.95502928,8 L6.64746554e-16,14.943453 L1.05833636,16 L8.54271718,8.52827348 C8.83496729,8.23651377 8.83496729,7.7634825 8.54271718,7.47172652 L1.05833636,0 L1.05833636,0 Z"
                                fill="#999" transform="matrix(-1 0 0 1 8.762 0)"
                              ></path>
                          </svg>
                      </span>
                  </a>
                  <a className="arrowRight_2eZTP arrow__5txj">
                      <span>
                          <svg width="9" height="16" viewBox="0 0 9 16"
                               xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M1.05833636,0 L0,1.05654696 L6.95502928,8 L6.64746554e-16,14.943453 L1.05833636,16 L8.54271718,8.52827348 C8.83496729,8.23651377 8.83496729,7.7634825 8.54271718,7.47172652 L1.05833636,0 L1.05833636,0 Z"
                                fill="#999"></path>
                          </svg>
                      </span>
                  </a>
              </div>
          </nav>
        )
    }

}

module.exports = withRouter(HeaderNavigation);
export default withRouter(HeaderNavigation);