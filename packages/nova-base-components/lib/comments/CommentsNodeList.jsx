import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';

class CommentsNodeList extends Component {

    render() {
        const results = this.props.results;
        const currentUser = this.props.currentUser;
        const hasMore = this.props.hasMore;
        const ready = this.props.ready;
        const count = this.props.count;
        const totalCount = this.props.totalCount;
        const loadMore = this.props.loadMore;

        return (
          <div className="discussion_cr2q_">

              {results.map(comment =>
                <Telescope.components.CommentsNode
                  comment={comment}
                  key={comment._id}
                  currentUser={currentUser}/>
              )}
              {hasMore ? (ready ?
                <Telescope.components.CommentsLoadMore loadMore={loadMore} count={count} totalCount={totalCount}/> :
                <Telescope.components.Loading/>) : null}
          </div>
        )
    }
}

CommentsNodeList.displayName = "CommentsNodeList";

module.exports = CommentsNodeList;