import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';

class UserLogin extends Component {

    oauthSignIn(serviceName) {
        //const {formState, waiting, user} = this.state;
        //Thanks Josh Owens for this one.
        function capitalService() {
            return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
        }

        if (serviceName === 'meteor-developer') {
            serviceName = 'meteorDeveloperAccount';
        }

        const loginWithService = Meteor["loginWith" + capitalService()];

        let options = {}; // use default scope unless specified
        if (Accounts.ui._options.requestPermissions[serviceName])
            options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
        if (Accounts.ui._options.requestOfflineToken[serviceName])
            options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
        if (Accounts.ui._options.forceApprovalPrompt[serviceName])
            options.forceApprovalPrompt = Accounts.ui._options.forceApprovalPrompt[serviceName];

        loginWithService(options, (error) => {
            if (error) {
                this.showMessage(T9n.get(`error.accounts.${error.reason}`) || T9n.get("Unknown error"));
            } else {
                this.dismissLoginUI();
                //this.showMessage(T9n.get(`error.accounts.{wanghao}`) || T9n.get("Unknown error"));
                //var formState = STATES.PROFILE;
                //this.setState({formState: formState, message: ''});
                //loginResultCallback(() => {
                //    Meteor.setTimeout(() => this.onSignedInHook(), 100);
                //});
            }
        });
    }

    showMessage(message, type, clearTimeout) {
        message = message.trim();

        if (message) {
            this.setState({message: {message: message, type: type}});
            if (clearTimeout) {
                Meteor.setTimeout(() => {
                    this.setState({message: null});
                }, clearTimeout);
            }
        }
    }

    onSignedInHook() {
        this.context.messages.appStatus.dismissLoginUI();
    }

    loginTwitter() {

    }

    loginFacebook() {
        this.oauthSignIn("facebook");
    }

    dismissLoginUI() {
        this.context.messages.appStatus.dismissLoginUI();
    }

    render() {
        return (
          <div className="modal-overlay v-fullscreen">
              <a className="modal--close v-desktop" onClick={this.dismissLoginUI.bind(this)} title="Close">
                    <span>
                        <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z"
                              ></path>
                        </svg>
                    </span>
              </a>
              <div className="modal--content">
                  <div className="login-fullscreen">
                      <h2 className="login-fullscreen--title">Login to</h2>
                      <p className="login-fullscreen--intro">Product Hunt is a community to share and geek out about the
                          latest products, books, games and podcasts. Join us :)</p>
                      <span>
                            <div className="buttonGroup_1mB5C">
                                <a
                                  className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d twitterSolidColor_G22Bs solidVariant_2wWrf"
                                  rel="login-with-twitter" onClick={this.loginTwitter.bind(this)}>
                                    <div className="buttonContainer_wTYxi">Log in with twitter</div>
                                </a>
                                <a
                                  className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d facebookSolidColor_pdgXp solidVariant_2wWrf"
                                  rel="login-with-facebook" onClick={this.loginFacebook.bind(this)}>
                                    <div className="buttonContainer_wTYxi">Log in with facebook</div>
                                </a>
                            </div>
                            <p className="login-fullscreen--login-info">We'll never post to Twitter or Facebook without your permission.</p>
                        </span>
                  </div>
              </div>
          </div>
        )
    }
}

UserLogin.contextTypes = {
    messages: React.PropTypes.object
};

UserLogin.displayName = "UserLogin";

module.exports = UserLogin;
