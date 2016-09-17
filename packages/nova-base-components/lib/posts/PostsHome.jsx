import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {ListContainer, DocumentContainer} from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";
import moment from 'moment';

class PostsHome extends Component {

    constructor(props) {
        super(props);
    }

    getDefaultView() {
        return {view: 'best'}
    }

    render() {
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
            this.context.messages.dismissAllPostPanels();
            const params = {...this.getDefaultView(), ...this.props.location.query, listId: "posts.list.main"};
            const {selector, options} = Posts.parameters.get(params);

            const limit = Telescope.settings.get("postsPerPage", 10);
            this.context.messages.resetNewsListContainer(limit)
            return (
              <div className="content_1jnXo">
                  <Telescope.components.NewsListContainer
                    collection={Posts}
                    publication="posts.list"
                    selector={selector}
                    options={options}
                    terms={params}
                    joins={Posts.getJoins()}
                    component={Telescope.components.PostsList}
                    cacheSubscription={false}
                    listId={params.listId}
                    limit={limit}
                  />
                  <div className="sidebar_Y2LGQ">

                      <Telescope.components.WidgetCalendar selected={moment().startOf("day")}/>
                      <Telescope.components.WidgetTopics />

                  </div>
              </div>
            )
        }
    }
}

PostsHome.contextTypes = {
    messages: React.PropTypes.object
};

module.exports = PostsHome;