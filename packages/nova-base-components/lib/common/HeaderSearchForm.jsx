import React, {PropTypes, Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/std:accounts-ui';
import {Modal, Dropdown, MenuItem} from 'react-bootstrap';
import {ContextPasser} from "meteor/nova:core";
import {LinkContainer} from 'react-router-bootstrap';
import Users from 'meteor/nova:users';
import {Messages} from "meteor/nova:core";

const keyCodes = {
    ENTER: 13,
    ESCAPE: 27,
    UP: 38,
    DOWN: 40
};

class HeaderSearchForm extends Component {

    constructor(props) {
        super(props);
        //if (!props.onChange) {
        //    throw new Error('You must supply a callback to `onChange`.');
        //}
        this.state = this.initialState = {
            highlightedItem: -1,
            searchTerm: '',
            suggestions: [
                {"href": "", "title": "Slack"},
                {"href": "", "title": "Bots"},
                {"href": "", "title": "Mac Apps"},
                {"href": "", "title": "Productivity"},
                {"href": "", "title": "Developer Tools"},
                {"href": "", "title": "Emojis"},
            ],
            value: '',
            searching: false
        };
    }

    onKeyDown(e) {
        const key = e.which || e.keyCode;
        switch (key) {
            case keyCodes.UP:
            case keyCodes.DOWN:
                e.preventDefault();
                this.scroll(key);
                break;

            case keyCodes.ENTER:
                this.search();
                break;

            case keyCodes.ESCAPE:
                this.refs.input.blur();
                self.onToggleBar();
                break;
        }
    }

    scroll(key) {
        const {highlightedItem: item, suggestions} = this.state;
        const lastItem = suggestions.length - 1;
        let nextItem;

        if (key === keyCodes.UP) {
            nextItem = (item <= 0) ? lastItem : item - 1;
        } else {
            nextItem = (item === lastItem) ? 0 : item + 1;
        }

        this.setState({
            highlightedItem: nextItem,
            value: suggestions[nextItem]
        });
    }

    onChange(e) {
        clearTimeout(this.timer);
        const input = e.target.value;
        if (!input) return this.setState(this.initialState);
        this.setState({value: input});
        this.timer = setTimeout(() => this.autosuggest(), this.props.delay);
    }

    normalizeInput() {
        return this.state.value.toLowerCase().trim();
    }

    autosuggest() {
        const searchTerm = this.normalizeInput();
        if (!searchTerm) return;
        new Promise((resolve) => {
            //this.props.onChange(searchTerm, resolve);
        }).then((suggestions) => {
            if (!this.state.value) return;
            this.setState({
                highlightedItem: -1,
                searchTerm,
                //suggestions
            });
        });
    }

    onFocusChanged(fourced) {

    }

    onBlurChanged() {
        this.onToggleBar();
    }

    onToggleBar() {
        let search = !this.state.searching
        this.context.messages.appStatus.isSearching(search);
        this.setState({searching: search});
    }

    renderBar() {
        if (this.state.searching) {
            return this.renderSearchingBar();
        }
        return this.renderNormalBar();
    }

    renderNormalBar() {
        return (
          <div onClick={this.onToggleBar.bind(this)} className="tags_1FTZg" data-test="search-trigger">
              <div className="tagScrollWrapper_2vzLG">
                  <div className="tagWrapper_2hyXS">
                              <span className="placeholder_KtrAE ellipsis_2lgar text_3Wjo0 subtle_1BWOT base_3CbW2">
                                  Discover your next favorite thing…
                              </span>
                  </div>
              </div>
          </div>
        )
    }

    renderSearchingBar() {
        return (
          <div>
              <input
                ref="input"
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onBlur={this.onBlurChanged.bind(this)}
                onKeyDown={this.state.suggestions && this.onKeyDown.bind(this)}
                onFocus={() => this.onFocusChanged()}
                autocomplete="off"
                className="input__gEkP"
                data-test="search-input"
                name="q"
                placeholder="Discover your next favorite thing…"
              />
              <div className="menu_2lgxg">
                  <div>
                      <ul>
                          {this.state.suggestions.map((item, key) => {
                              return (
                                <li key={key}>
                                    <a href="{item.href}">
                                        <span className="text_3Wjo0 default_tBeAo base_3CbW2">{item.title}</span>
                                    </a>
                                </li>
                              );
                          })}
                      </ul>
                  </div>
                  <div className="footer_LIeld">
                      <span className="hint_3pAqW secondaryText_PM80d subtle_1BWOT base_3CbW2">Press enter to see all results</span>
                  </div>
              </div>
          </div>
        )
    }

    render() {
        return (
          <form className="container_2cR6a" method="GET" action="/search/posts">
              <label className="text_3Wjo0 subtle_1BWOT base_3CbW2">
                          <span className="searchIcon_3L3Y2">
                              <svg width="15"
                                   height="15"
                                   viewBox="0 0 15 15"
                                   xmlns="http://www.w3.org/2000/svg">
                                  <title>Oval 95</title>
                              <path
                                d="M9.383 10.347c-.987.78-2.233 1.244-3.588 1.244C2.595 11.59 0 8.997 0 5.796 0 2.595 2.595 0 5.795 0c3.2 0 5.796 2.595 5.796 5.795 0 1.355-.464 2.6-1.243 3.588L15 14.036l-.964.964-4.653-4.653zm-3.588-.12c2.448 0 4.432-1.984 4.432-4.432 0-2.447-1.984-4.43-4.432-4.43-2.447 0-4.43 1.983-4.43 4.43 0 2.448 1.983 4.432 4.43 4.432z"
                                fill="#BBB" ></path></svg>
                          </span>
                  {this.renderBar()}
                  <button className="close_19Ofw" type="reset">
                              <span>
                                  <svg width="12" height="12"
                                       viewBox="0 0 12 12"
                                       xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z"
                                    ></path>
                                  </svg>
                              </span>
                  </button>
              </label>
          </form>
        )
    }
}

HeaderSearchForm.contextTypes = {
    messages: React.PropTypes.object
};

module.exports = HeaderSearchForm;
export default HeaderSearchForm;