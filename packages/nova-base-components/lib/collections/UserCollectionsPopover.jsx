import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {Button} from 'react-bootstrap';
import moment from 'moment';

class UserCollectionsPopover extends Component {

    constructor(props) {
        super(props);
    }

    renderLoading() {
        const comp = this.props.comp;
        const top = comp.top + comp.height + 14;
        const left = (comp.left + comp.width / 2) - 75;

        return (
          <div className="popover v-bottom-center" style={{top: top, left: left}}>
              <div className="popover--loader"></div>
          </div>
        )
    }

    render() {
        return this.renderLoading()
    }
}

module.exports = UserCollectionsPopover;
export default UserCollectionsPopover;
