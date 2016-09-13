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

};

FoldersList.displayName = "FoldersList";

module.exports = FoldersList;