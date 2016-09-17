import React, {PropTypes, Component} from 'react';
import {FlashContainer} from "meteor/nova:core";
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";

class Week extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var days = [],
          date = this.props.date,
          month = this.props.month;

        for (var i = 0; i < 7; i++) {
            var day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                lastMonth: date.month() <= month.month(),
                isCurrentMonth: date.month() === month.month(),
                nextMonth: date.month() >= month.month(),
                disableMonth: date.month() >= month.month(),
                isToday: date.isSame(new Date(), "day"),
                disable: date.isAfter(new Date(), "day"),
                date: date
            };
            var _className = "rc-calendar-cell" +
              (day.isToday ? " rc-calendar-today" : "") +
              (day.date.isSame(this.props.selected) ? " rc-calendar-selected-day" : "");
            if (!day.isCurrentMonth) {
                _className +=
                  (day.lastMonth ? " rc-calendar-last-month-cell" : "") +
                  (day.nextMonth ? " rc-calendar-next-month-btn-day" : "");
            }
            _className += (day.disable ? " rc-calendar-disabled-cell" : "");

            days.push(
              <td role="gridcell" title="2016-5-29" className={_className}
                  key={day.date.toString()}>
                  <div className="rc-calendar-date"
                       onClick={day.disable ? null : this.props.select.bind(this, day)}> {day.number}</div>
              </td>
            );
            date = date.clone();
            date.add(1, "d");
        }

        return (
          <tr role="row" key={days[0].toString()}>
              {days}
          </tr>
        )
    }
}

Week.contextTypes = {
    messages: React.PropTypes.object
};

Week.displayName = "Week";

module.exports = Week;
    