import Telescope from 'meteor/nova:lib';
import React from 'react';
const moment = require('moment');

const FoldersList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true}) => {

    // console.log(results);
    // console.log(ready);
    // console.log(hasMore);
    // console.log(totalCount);
    // console.log(count);

    return (
      <section className="results_37tfm">
          {/*render left panel*/}
          <div>
              <div className="fullWidthBox_3Dggh box_c4OJj">
                  <div className="content_DcBqe">
                      {/*<Telescope.components.FoldersListTitle/>*/}
                      <div className="posts_275PF">
                          <ul className="postsList_2tOc7">
                              {results.map(post =>
                                <li>
                                    <Telescope.components.FoldersItem post={post}
                                                                      currentUser={currentUser}
                                                                      key={post._id}/>
                                </li>
                              )}
                          </ul>
                      </div>
                      {hasMore ? (ready ? <Telescope.components.PostsLoadMore loadMore={loadMore} count={count}
                                                                              totalCount={totalCount}/> :
                        null) : null}
                  </div>
              </div>
              {hasMore ? <Telescope.components.PostsLoading/> : null}
          </div>
      </section>
    )

};

FoldersList.displayName = "FoldersList";

module.exports = FoldersList;