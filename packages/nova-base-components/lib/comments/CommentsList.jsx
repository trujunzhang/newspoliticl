import Telescope from 'meteor/nova:lib';
import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';

const CommentsList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore}) => {

  if (!!results.length) {
    return (
      <Telescope.components.CommentsNodeList results={results}
                                             currentUser={currentUser}
                                             hasMore={hasMore}
                                             ready={ready}
                                             count={count}
                                             totalCount={totalCount}
                                             loadMore={loadMore}/>
    )
  } else if (!ready) {
    return (
      <div className="comments-list">
        <Telescope.components.Loading/>
      </div>
    )
  } else {
    return (
      <div className="comments-list">
        <p>
          <FormattedMessage id="comments.no_comments"/>
        </p>
      </div>
    )
  }

};

CommentsList.displayName = "CommentsList";

module.exports = CommentsList;