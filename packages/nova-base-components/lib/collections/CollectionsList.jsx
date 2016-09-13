import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {Button} from 'react-bootstrap';
import moment from 'moment';
import Folders from "meteor/nova:folders";

import {ListContainer, DocumentContainer} from "meteor/utilities:react-list-container";

class CollectionsList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <ListContainer
            collection={Folders}
            publication="folders.list"
            selector={{}}
            options={{}}
            terms={{userId: this.props.userId}}
            joins={Folders.getJoins()}
            component={Telescope.components.CollectionsResult}
            cacheSubscription={true}
            listId={"user.folder.list"}
            limit={Telescope.settings.get("postsPerPage", 10)}
          />
        )
    }
}

module.exports = CollectionsList;
export default CollectionsList;
