import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {ListContainer, DocumentContainer} from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";

class PostsHome extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.context.messages.appStatus.registerPostsHome(this);
        this.state = this.initialState = {
            postPostParams: {type: "home", para: null}
        };
    }

    getDefaultView() {
        return {view: 'top'}
    }

    fixParams(params) {
        const postPostParams = this.state.postPostParams;
        const type = postPostParams.type;
        if (type == "calender") {
            params.before = postPostParams.para;
            params.after = postPostParams.para;
        }
    }

    render() {

        const params = {...this.getDefaultView(), ...this.props.location.query, listId: "posts.list.main"};
        this.fixParams(params);
        const {selector, options} = Posts.parameters.get(params);

        return (
          <ListContainer
            collection={Posts}
            publication="posts.list"
            selector={selector}
            options={options}
            terms={params}
            joins={Posts.getJoins()}
            component={Telescope.components.PostsList}
            cacheSubscription={true}
            listId={params.listId}
            limit={Telescope.settings.get("postsPerPage", 10)}
          />
        )
    }
}

PostsHome.contextTypes = {
    messages: React.PropTypes.object
};

module.exports = PostsHome;