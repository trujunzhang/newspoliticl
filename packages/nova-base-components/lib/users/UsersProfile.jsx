import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {ListContainer} from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";
import Users from 'meteor/nova:users';
import {Link} from 'react-router';

const UsersProfile = ({user}, {currentUser}) => {

    //const twitterName = Users.getTwitterName(user);

    //const terms = {
    //    view: "userPosts",
    //    userId: user._id
    //};
    //const {selector, options} = Posts.parameters.get(terms);

    return (
      <div>
          <Telescope.components.UserProfileHeader {...this.props}/>
          <div className="constraintWidth_ZyYbM body_1RqUJ">
              <nav className="navigation_3_Vku">
                  <ol>
                      <li>
                          <a className="text_3Wjo0 default_tBeAo base_3CbW2 active_1bUET" href="https://www.producthunt.com/@trujunzhang">
                              <em>0</em>
                              <span>Upvotes</span>
                          </a>
                      </li>
                      <li>
                          <a className="text_3Wjo0 default_tBeAo base_3CbW2" href="https://www.producthunt.com/@trujunzhang/topics">
                              <em>5</em>
                              <span>Topics</span>
                          </a>
                      </li>
                      <li>
                          <a className="text_3Wjo0 default_tBeAo base_3CbW2" href="https://www.producthunt.com/@trujunzhang/collections">
                              <em>0</em>
                              <span>Collections</span>
                          </a>
                      </li>
                      <li className="hideOnLargeScreen_3y6m4">
                          <a className="text_3Wjo0 default_tBeAo base_3CbW2" href="https://www.producthunt.com/@trujunzhang/following">
                              <em>5</em>
                              <span>
                                    Following</span>
                          </a>
                      </li>
                      <li className="hideOnLargeScreen_3y6m4">
                          <a className="text_3Wjo0 default_tBeAo base_3CbW2" href="https://www.producthunt.com/@trujunzhang/followers">
                              <em>0</em>
                              <span>
                                    Followers
                                </span>
                          </a>
                      </li>
                  </ol>
              </nav>
              <main className="content_36o4C">
                  <div>
                      <div className="fullWidthBox_3Dggh box_c4OJj">
                          <div className="header_3GFef hideOnSmallScreen_1VjPA">
                                <span >
                                    <span className="title_38djq featured_2W7jd default_tBeAo base_3CbW2">0 Upvotes</span>
                                </span>
                          </div>
                          <div className="content_DcBqe">
                              <div className="placeholder_lYzpv">
                                  <span className="emoji_1lBv0 emoji_style">😩</span>
                                  <span className="text_3Wjo0 subtle_1BWOT base_3CbW2">No upvotes yet.</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </main>
              <aside className="sidebar_74Fq4">
                  <div className="paddedBox_2UY-S box_c4OJj sidebarBox_1-7Yk">
                      <div className="content_DcBqe">
                          <div className="header_3GFef">
                              <span className="sidebarTitle_25eeI secondaryBoldText_1PBCf secondaryText_PM80d default_tBeAo base_3CbW2">Share your profile</span>
                          </div>
                          <div className="sharing_3oKwp">
                              <a className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d twitterSolidColor_G22Bs solidVariant_2wWrf sharingButton_1nb3A" href="https://www.producthunt.com/@trujunzhang#" rel="share-on-twitter">
                                  <div className="buttonContainer_wTYxi">
                                        <span>
                                            <svg width="16px" height="13px" viewBox="0 0 16 13" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                                <path d="M15.999,1.5367041 C15.4105184,1.79765391 14.7775382,1.97411998 14.1135589,2.05360469 C14.7910377,1.64718285 15.3115215,1.00430648 15.5570138,0.237953855 C14.9225336,0.613881561 14.2200556,0.887328975 13.472579,1.03430071 C12.8735977,0.39642338 12.0206243,-0.002 11.0766538,-0.002 C9.26371048,-0.002 7.7942564,1.46721746 7.7942564,3.27986887 C7.7942564,3.53731936 7.82325549,3.7877712 7.87925374,4.02772505 C5.15133899,3.89075139 2.73241458,2.58400269 1.11346517,0.598384541 C0.830974001,1.08329129 0.668979063,1.64668295 0.668979063,2.2485672 C0.668979063,3.3873482 1.24846095,4.39165507 2.12943342,4.98054182 C1.59145024,4.96354509 1.08546605,4.81607345 0.642479891,4.57012075 C0.641979907,4.58361815 0.641979907,4.59761546 0.641979907,4.61161277 C0.641979907,6.20180696 1.77344455,7.52805191 3.27489763,7.82949394 C2.99940624,7.90447952 2.7094153,7.94447183 2.40992466,7.94447183 C2.19843127,7.94447183 1.99293769,7.92397577 1.79244395,7.88548318 C2.20993091,9.18923246 3.42239302,10.13805 4.85884813,10.1645449 C3.73538324,11.0448756 2.31992747,11.5692748 0.781975532,11.5692748 C0.516983813,11.5692748 0.255991969,11.5537777 -0.001,11.5232836 C1.45145461,12.4546045 3.17690069,12.998 5.03084275,12.998 C11.0686541,12.998 14.3700509,7.99696174 14.3700509,3.65979581 C14.3700509,3.51732321 14.367051,3.37585041 14.3605512,3.23537743 C15.0020312,2.77246645 15.5585138,2.19457758 15.9985,1.5367041 L15.999,1.5367041 Z" id="twitter" fill="#000000"></path>
                                            </svg>
                                        </span>
                                  </div>
                              </a>
                              <a className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d facebookSolidColor_pdgXp solidVariant_2wWrf sharingButton_1nb3A" href="https://www.producthunt.com/@trujunzhang#" rel="share-on-facebook">
                                  <div className="buttonContainer_wTYxi">
                                        <span>
                                            <svg width="8" height="13" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.2 2.323H5.923c-1.046 0-1.278.464-1.278 1.16V5.11h2.44l-.35 2.438h-2.09v6.387H2.09V7.548H0V5.11h2.09V3.252C2.09 1.162 3.368 0 5.342 0c.93 0 1.742.116 1.858.116v2.207z" fill="#FFF" fill-rule="evenodd"></path>
                                            </svg>
                                        </span>
                                  </div>
                              </a>
                          </div>
                      </div>
                  </div>
                  <div className="paddedBox_2UY-S box_c4OJj sidebarBox_1-7Yk">
                      <div className="content_DcBqe">
                          <div className="header_3GFef">
                              <span className="sidebarTitle_25eeI secondaryBoldText_1PBCf secondaryText_PM80d default_tBeAo base_3CbW2">Followed Topics</span>
                          </div>
                          <ol>
                              <li className="sidebarItem_175e3">
                                  <a className="sidebarItemLink_2RXkK ellipsis_2lgar text_3Wjo0 subtle_1BWOT base_3CbW2" href="https://www.producthunt.com/topics/github">GitHub</a>
                              </li>
                              <li className="sidebarItem_175e3">
                                  <a className="sidebarItemLink_2RXkK ellipsis_2lgar text_3Wjo0 subtle_1BWOT base_3CbW2" href="https://www.producthunt.com/topics/developer-tools">Developer Tools</a>
                              </li>
                              <li className="sidebarItem_175e3">
                                  <a className="sidebarItemLink_2RXkK ellipsis_2lgar text_3Wjo0 subtle_1BWOT base_3CbW2" href="https://www.producthunt.com/topics/prototyping">Prototyping</a>
                              </li>
                              <li className="sidebarItem_175e3">
                                  <a className="sidebarItemLink_2RXkK ellipsis_2lgar text_3Wjo0 subtle_1BWOT base_3CbW2" href="https://www.producthunt.com/topics/analytics">Analytics</a>
                              </li>
                              <li className="sidebarItem_175e3">
                                  <a className="sidebarItemLink_2RXkK ellipsis_2lgar text_3Wjo0 subtle_1BWOT base_3CbW2" href="https://www.producthunt.com/topics/open-source">Open Source</a>
                              </li>
                          </ol>
                      </div>
                  </div>
              </aside>
          </div>
      </div>
    )
};

UsersProfile.propTypes = {
    user: React.PropTypes.object.isRequired
};

UsersProfile.contextTypes = {
    currentUser: React.PropTypes.object
};

UsersProfile.displayName = "UsersProfile";

module.exports = UsersProfile;
