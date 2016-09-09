import React, {PropTypes, Component} from 'react';
import {FormattedMessage, intlShape} from 'react-intl';
import Formsy from 'formsy-react';
import {Input} from 'formsy-react-components';
//import Actions from "../actions.js";
import {Button} from 'react-bootstrap';
import Cookie from 'react-cookie';
//import { Messages } from "meteor/nova:core";
import Users from 'meteor/nova:users';

class Newsletter extends Component {

    constructor(props, context) {
        super(props);
        this.subscribeEmail = this.subscribeEmail.bind(this);
        this.successCallbackSubscription = this.successCallbackSubscription.bind(this);
        this.dismissBanner = this.dismissBanner.bind(this);

        const showBanner =
          Cookie.load('showBanner') !== "no" && !Users.getSetting(context.currentUser, 'newsletter_subscribeToNewsletter', false);

        this.state = {
            showBanner: showBanner
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.currentUser) {
            const showBanner =
              Cookie.load('showBanner') !== "no" && !Users.getSetting(nextContext.currentUser, 'newsletter_subscribeToNewsletter', false);

            this.setState({showBanner});
        }
    }

    subscribeEmail(data) {
        this.context.actions.call("newsletter.addEmail", data.email, (error, result) => {
            if (error) {
                console.log(error);
                this.context.messages.flash(error.message, "error");
            } else {
                this.successCallbackSubscription(result);
            }
        });
    }

    successCallbackSubscription(result) {
        this.context.messages.flash(this.context.intl.formatMessage({id: "newsletter.success_message"}), "success");
        this.dismissBanner();
    }

    dismissBanner(e) {
        if (e && e.preventDefault) e.preventDefault();

        this.setState({showBanner: false});

        // set cookie
        Cookie.save('showBanner', "no");
    }

    renderButton() {
        return (
          <div className="news_letter_button_panel">
              <Telescope.components.NewsletterButton
                successCallback={() => this.successCallbackSubscription()}
                subscribeText={this.context.intl.formatMessage({id: "newsletter.subscribe"})}
                user={this.context.currentUser}
              />
          </div>
        )
    }

    renderForm() {
        return (
          <Formsy.Form className="form_1Nyhn" onSubmit={this.subscribeEmail}>
              <div className="fieldWrap_1C8su">
                  <Input
                    className="field_34Q-8 text_3Wjo0 subtle_1BWOT base_3CbW2"
                    name="email"
                    value=""
                    placeholder={this.context.intl.formatMessage({id: "newsletter.email"})}
                    type="email"
                    layout="elementOnly"
                  />
              </div>
              <Button
                className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidVariant_2wWrf"
                type="submit" bsStyle="primary">
                  <FormattedMessage id="newsletter.subscribe" className="buttonContainer_wTYxi"/>
              </Button>
          </Formsy.Form>
        )
    }

    render() {

        return this.state.showBanner
          ? (
          <div className="constraintWidth_ZyYbM hide-via-blocking-js--subscribe-to-newsletter">
              <div className="fullWidthBox_3Dggh box_c4OJj container_R3fsF">
                  <div className="content_DcBqe">
                      <div className="boxContent_2e30p">
                          <span className="close_1JGKW">
                            <svg width="12" height="12" viewBox="0 0 12 12"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z"
                                >
                                </path>
                            </svg>
                          </span>
                          <span className="welcomeEmoji_3oUs1 welcome_emoji_icon"/>
                          <span
                            className="welcome_tPFOL boldText_3B8fa text_3Wjo0 default_tBeAo base_3CbW2">Welcome to Politicl News</span>
                          <span className="tagline_1UlAa text_3Wjo0 subtle_1BWOT base_3CbW2">Get the best news in your inbox, daily.</span>
                          {this.context.currentUser ? this.renderButton() : this.renderForm()}
                      </div>
                  </div>
              </div>
          </div>
        ) : null;
    }
}

Newsletter.contextTypes = {
    currentUser: React.PropTypes.object,
    actions: React.PropTypes.object,
    messages: React.PropTypes.object,
    intl: intlShape
};

module.exports = Newsletter;
export default Newsletter;