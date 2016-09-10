import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {ListContainer, DocumentContainer} from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";
import moment from 'moment';

class PostsHome extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.context.messages.appStatus.registerPostsHome(this);
        this.state = this.initialState = {
            postPostParams: {type: "home", para: null},
        };
    }

    getDefaultView() {
        return {view: 'best'}
    }

    fixParams(params, query) {
        const postPostParams = this.state.postPostParams;
        const type = postPostParams.type;
        if (type == "calender") {
            const selectedDay = postPostParams.para;
            params.before = selectedDay;
            params.after = selectedDay;
            params.date = moment(selectedDay).format('YYYY-MM-DD');
        }
        else if (this.props.location.query.tag) {
            this.context.messages.dismissAllPostPanels();
        }
    }

    render() {

        const params = {...this.getDefaultView(), ...this.props.location.query, listId: "posts.list.main"};
        this.fixParams(params, this.props.location.query);
        const {selector, options} = Posts.parameters.get(params);

        if (this.props.location.query.postid) {
            const singleParams = {
                "slug": this.props.location.query.title,
                "_id": this.props.location.query.postid
            };
            return (
              <DocumentContainer
                collection={Posts}
                publication="posts.single"
                selector={{_id: singleParams._id}}
                terms={singleParams}
                joins={Posts.getJoins()}
                component={Telescope.components.PostsPage}
              />
            )
        } else {
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
}

PostsHome.contextTypes = {
    messages: React.PropTypes.object
};

module.exports = PostsHome;