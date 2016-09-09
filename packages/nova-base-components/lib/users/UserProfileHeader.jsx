import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';

class UserProfileHeader extends Component {

    render() {
        const user = this.props.user;
        const avatarUrl = Users.avatar.getUrl(user);
        const avatar = avatarUrl ? <img height="140" width="140" src={avatarUrl}/> : "";

        return (
          <div>
              <div className="constraintWidth_ZyYbM constraintWidth_2VQxE">
                  <header className="backgroundImage_1hK9M header_21q-l">
                        <span className="user-image image_1r8-2 v-big">
                            <div className="container_22rD3 user-image--image user-image-size">
                                <div className="container__Ql6q lazyLoadContainer_3KgZD">
                                    {avatar}
                                </div>
                            </div>
                        </span>
                      <div className="info_2UynN">
                          <div className="primary_38IeC">
                              <h1 className="headline_azIav inverse_1CN6F base_3CbW2">TrujunZhang</h1>
                              <span className="text_3Wjo0 inverse_1CN6F base_3CbW2"># 641022</span>
                          </div>
                          <h2
                            className="username_3tQri featured_2W7jd inverse_1CN6F base_3CbW2">@trujunzhang</h2>
                          <p className="secondary_Yuxa5 text_3Wjo0 inverse_1CN6F base_3CbW2">I'm a freelancer,
                              http://www.scruby.site
                              <a className="twitter_3_mOY" href="https://twitter.com/TrujunZhang" rel="user-twitter"
                                 target="_blank">
                                    <span>
                                        <svg width="16px" height="13px" viewBox="0 0 16 13" version="1.1"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                              d="M15.999,1.5367041 C15.4105184,1.79765391 14.7775382,1.97411998 14.1135589,2.05360469 C14.7910377,1.64718285 15.3115215,1.00430648 15.5570138,0.237953855 C14.9225336,0.613881561 14.2200556,0.887328975 13.472579,1.03430071 C12.8735977,0.39642338 12.0206243,-0.002 11.0766538,-0.002 C9.26371048,-0.002 7.7942564,1.46721746 7.7942564,3.27986887 C7.7942564,3.53731936 7.82325549,3.7877712 7.87925374,4.02772505 C5.15133899,3.89075139 2.73241458,2.58400269 1.11346517,0.598384541 C0.830974001,1.08329129 0.668979063,1.64668295 0.668979063,2.2485672 C0.668979063,3.3873482 1.24846095,4.39165507 2.12943342,4.98054182 C1.59145024,4.96354509 1.08546605,4.81607345 0.642479891,4.57012075 C0.641979907,4.58361815 0.641979907,4.59761546 0.641979907,4.61161277 C0.641979907,6.20180696 1.77344455,7.52805191 3.27489763,7.82949394 C2.99940624,7.90447952 2.7094153,7.94447183 2.40992466,7.94447183 C2.19843127,7.94447183 1.99293769,7.92397577 1.79244395,7.88548318 C2.20993091,9.18923246 3.42239302,10.13805 4.85884813,10.1645449 C3.73538324,11.0448756 2.31992747,11.5692748 0.781975532,11.5692748 C0.516983813,11.5692748 0.255991969,11.5537777 -0.001,11.5232836 C1.45145461,12.4546045 3.17690069,12.998 5.03084275,12.998 C11.0686541,12.998 14.3700509,7.99696174 14.3700509,3.65979581 C14.3700509,3.51732321 14.367051,3.37585041 14.3605512,3.23537743 C15.0020312,2.77246645 15.5585138,2.19457758 15.9985,1.5367041 L15.999,1.5367041 Z"
                                              id="twitter" fill="#000000"></path>
                                        </svg>
                                    </span>
                              </a>
                          </p>
                      </div>
                      <div className="social_1SKRS">
                          <a
                            className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d simpleVariant_1Nl54"
                            href="https://www.producthunt.com/my/settings/edit">
                              <div className="buttonContainer_wTYxi">edit</div>
                          </a>
                      </div>
                  </header>
              </div>

          </div>
        )
    }
}

UserProfileHeader.propTypes = {
    user: React.PropTypes.object.isRequired,
};

UserProfileHeader.contextTypes = {
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object
};

UserProfileHeader.displayName = "UserProfileHeader";

module.exports = UserProfileHeader;
