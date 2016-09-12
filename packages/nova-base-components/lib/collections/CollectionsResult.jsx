import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {Button} from 'react-bootstrap';
import moment from 'moment';

class CollectionsResult extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const results = this.props.results;

        return (
          <ul className="collections-popover--collections popover--scrollable-list">
              {results.map((folder, index) => {
                    return (
                      <li>
                          <a className="collections-popover--collection popover--scrollable-list--element"
                             href="https://www.producthunt.com/#">{folder.name}
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

module.exports = CollectionsResult;
export default CollectionsResult;
