import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {Button} from 'react-bootstrap';
import moment from 'moment';

class CollectionsResult extends Component {

    constructor(props) {
        super(props);
    }

    onCollectedItemClick(folder) {
        const userCollections = this.context.messages.userCollections;
        folder.lastPost = userCollections.savedPost._id;
        this.context.actions.call('folders.insertPost', folder, (error, result) => {
            if (!error) {
                userCollections.setState({showResult: true, newFolder: folder});
            }
        });
    }

    render() {
        const results = this.props.results;

        return (
          <ul className="collections-popover--collections popover--scrollable-list">
              {results.map((folder, index) => {
                    return (
                      <li>
                          <a className="collections-popover--collection popover--scrollable-list--element"
                             onClick={this.onCollectedItemClick.bind(this, folder)}>
                              {folder.name}
                              <span className="collections-popover--collection--icon v-collect"></span>
                          </a>
                      </li>
                    )
                }
              )}
          </ul>
        )
    }
}

CollectionsResult.contextTypes = {
    actions: React.PropTypes.object,
    events: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object
};

module.exports = CollectionsResult;
export default CollectionsResult;
