import React, {PropTypes, Component} from 'react';
import {ListContainer} from "meteor/utilities:react-list-container";
import Categories from "meteor/nova:categories";

class PostTagItem extends Component {
    render() {
        const tags = this.props.post.tags;
        if (tags) {
            return (
              <div className="topics_39_B0" rel="topics-list">
                  {tags.map((menu, key) => {
                      return (
                        <div className="topicWrap_2Uvaj" rel="topic-item">
                        <span>
                            <a key={key}
                               className="button_2I1re smallSize_1da-r secondaryText_PM80d greySolidColor_270pZ solidVariant_2wWrf"
                               href="/topics/iphone">
                                <div className="buttonContainer_wTYxi">{menu}</div>
                            </a>
                        </span>
                        </div>
                      )
                  })}
              </div>
            )
        }
        return null;
    }
}

PostTagItem.displayName = "PostTagItem";

module.exports = PostTagItem;
export default PostTagItem;
