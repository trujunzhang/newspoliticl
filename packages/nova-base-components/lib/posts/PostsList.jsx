import Telescope from 'meteor/nova:lib';
import React from 'react';
var Waypoint = require('react-waypoint');

const PostsList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore}) => {

    if (!!results.length) {
        return (
          <section className="results_37tfm">
              <div>
                  <div className="fullWidthBox_3Dggh box_c4OJj">
                      <div className="content_DcBqe">
                          <Telescope.components.PostsListTitle/>
                          <div className="posts_275PF">
                              <ul className="postsList_2tOc7">
                                  {results.map(post =>
                                    <li key={post._id}>
                                        <Telescope.components.PostsItem post={post} currentUser={currentUser}/>
                                    </li>
                                  )}
                              </ul>
                          </div>
                          <div>
                              <Waypoint
                                onEnter={({previousPosition, currentPosition, event}) => {
                                    // do something useful!
                                    loadMore(event);
                                }}
                                threshold={0}
                              />
                          </div>
                      </div>
                  </div>
                  {hasMore ? <Telescope.components.PostsLoading message={"Hunting down posts..."}/> : null}
              </div>
          </section>
        )
    } else if (!ready) {
        return (
          <section className="results_37tfm">
              <div>
                  <Telescope.components.PostsLoading message={"Hunting down posts..."}/>
              </div>
          </section>
        )
    } else {
        return (
          <section className="results_37tfm">
              <div>
                  <Telescope.components.PostsLoading message={"No posts to display."}/>
              </div>
          </section>
        )
    }
};

PostsList.displayName = "PostsList";

module.exports = PostsList;