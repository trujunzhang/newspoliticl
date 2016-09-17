import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {ListContainer, DocumentContainer} from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";
import moment from 'moment';

class NewsListContainer extends ListContainer {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.context.messages.registerNewsListContainer(this);
    }

}

NewsListContainer.contextTypes = {
    messages: React.PropTypes.object
};

module.exports = NewsListContainer;
export default NewsListContainer;