import React, {PropTypes, Component} from 'react';
import {withRouter} from 'react-router'

class PostsListTitle extends Component {

    onViewTypeMenuClick(view) {
        const router = this.props.router;
        router.push({pathname: "/", query: {...query, view: view}});
    }

    render() {
        const query = this.props.router.location.query;
        const isNewsestMenu = (query.view && query.view == 'new');
        const popularMenuClass = (!isNewsestMenu) ? "secondaryText_PM80d default_tBeAo base_3CbW2" : "secondaryText_PM80d subtle_1BWOT base_3CbW2";
        const newestMenuClass = isNewsestMenu ? "secondaryText_PM80d default_tBeAo base_3CbW2" : "secondaryText_PM80d subtle_1BWOT base_3CbW2";
        return (
          <div className="header_3GFef">
              <span className="header_title">
                  <span className="title_38djq featured_2W7jd default_tBeAo base_3CbW2">Today</span>
              </span>
              <div className="toggle_Tx6Vy">
                  <a className={popularMenuClass} onClick={this.onViewTypeMenuClick.bind(this, 'top')}>Popular</a>
                  <a className={newestMenuClass} onClick={this.onViewTypeMenuClick.bind(this, 'new')}>Newest</a>
              </div>
          </div>
        )
    }
}

module.exports = withRouter(PostsListTitle);
export default withRouter(PostsListTitle);