import React, {PropTypes, Component} from 'react';
import {FlashContainer} from "meteor/nova:core";
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";

class WidgetTopics extends Component {

    constructor(props) {
        super(props);

        this.state = this.initialState = {};
    }

    render() {
        const topics = [
            {href: "/?cat=color-theory", title: "Aam Aadmi Party"},
            {href: "/?cat=color-theory", title: "AAP in Punjab"},
            {href: "/?cat=color-theory", title: "Punjab polls"},
            {href: "/?cat=color-theory", title: "Sting videos"},
            {href: "/?cat=color-theory", title: "Sucha Singh Chhotepur"},
            {href: "/?cat=color-theory", title: "Deepa Seetharam"},
            {href: "/?cat=color-theory", title: "Foreign Service"},
            {href: "/?cat=color-theory", title: "IFS"},
            {href: "/?cat=color-theory", title: "UAE"},
            {href: "/?cat=color-theory", title: "United Arab Emirates"},
            {href: "/?cat=color-theory", title: "Bangla"},
            {href: "/?cat=color-theory", title: "Mamata Banerjee"},
            {href: "/?cat=color-theory", title: "West Bengal"},
            {href: "/?cat=color-theory", title: "Advertising"},
            {href: "/?cat=color-theory", title: "facebook"},
            {href: "/?cat=color-theory", title: "Tech"},
            {href: "/?cat=color-theory", title: "WhatsApp privacy policy"},
            {href: "/?cat=color-theory", title: "WhatsApp-Facebook data sharing"},
        ];
        return (
          <div className="paddedBox_2UY-S box_c4OJj sidebarBox_1-7Yk sidebarBoxPadding_y0KxM">
              <div className="content_DcBqe">

                  <Telescope.components.WidgetHeader message="TRENDING"/>

                  <div className="sidebar-block sidebar-categories">
                      <h4 className="sidebar-heading">Categories</h4>
                      <ul className="categories-list">
                          {topics.map((item, key) => {
                              return (
                                <li key={key} className="category-menu-item">
                                    <a className="posts-category" href={item.href}>{item.title}</a>
                                </li>
                              )
                          })}
                      </ul>
                  </div>

              </div>
          </div>
        )
    }

}

WidgetTopics.contextTypes = {
    messages: React.PropTypes.object
};

WidgetTopics.displayName = "WidgetTopics";

module.exports = WidgetTopics;
