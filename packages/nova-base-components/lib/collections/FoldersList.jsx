import Telescope from 'meteor/nova:lib';
import React from 'react';
const moment = require('moment');

const FoldersList = ({
  results,
  currentUser,
  hasMore,
  ready,
  count,
  totalCount,
  loadMore,
  showHeader = true
}) => {

    // console.log(results);
    // console.log(ready);
    // console.log(hasMore);
    // console.log(totalCount);
    // console.log(count);

    return (

      <main className="content_36o4C">
          <div>
              <div className="paddedBox_2UY-S box_c4OJj">
                  <div className="header_3GFef hideOnSmallScreen_1VjPA">
                        <span >
                            <span
                              className="title_38djq featured_2W7jd default_tBeAo base_3CbW2">{results.length + " Collections"}</span>
                        </span>
                  </div>
                  <div className="content_DcBqe">
                      <div className="grid_hjrL6">

                          {results.map((folder, index) => {
                              return (
                                <Telescope.components.FoldersItem folder={folder}/>
                              )
                          })}

                      </div>
                  </div>
              </div>
          </div>
      </main>

    )

};

FoldersList.displayName = "FoldersList";

module.exports = FoldersList;
