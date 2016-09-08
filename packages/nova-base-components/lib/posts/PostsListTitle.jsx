import React, {PropTypes, Component} from 'react';

class PostsListTitle extends Component {

    render() {
        return (
          <div className="header_3GFef">
                                  <span className="header_title">
                                      <span className="title_38djq featured_2W7jd default_tBeAo base_3CbW2">Today</span>
                                  </span>
              <div className="toggle_Tx6Vy">
                  <a className="secondaryText_PM80d default_tBeAo base_3CbW2" href="/">Popular</a>
                  <a className="secondaryText_PM80d subtle_1BWOT base_3CbW2"
                     href="/newest">Newest</a>
              </div>
          </div>
        )
    }
}

module.exports = PostsListTitle;
export default PostsListTitle;