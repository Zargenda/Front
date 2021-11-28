import React, { Component } from "react";
import moment from "moment";

import Timeline from "react-calendar-timeline";

import generateFakeData from "./generate-fake-data";

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

export default class App extends Component {
  constructor(props) {
    super(props);

    const groups = [{ id: 1, title: '8-9' }, { id: 2, title: '9-10' }, { id: 3, title: '10-11' }, { id: 4, title: '11-12' }, { id: 5, title: '12-13' }, { id: 6, title: '13-14' }, { id: 7, title: '14-15' }, { id: 8, title: '15-16' },{ id: 9, title: '16-17' }, { id: 10, title: '17-18' }, { id: 11, title: '18-19' }, { id: 12, title: '19-20' }, { id: 13, title: '20-21' }]
    const { items } = generateFakeData();
    const defaultTimeStart = moment()
      .startOf("day")
      .toDate();
    const defaultTimeEnd = moment()
      .startOf("day")
      .add(1, "day")
      .toDate();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd
    };
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            })
          : item
      )
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time
            })
          : item
      )
    });

    console.log("Resized", itemId, time, edge);
  };

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={"both"}
        defaultTimeStart={new Date("November 22, 2021 00:00:00")}
        defaultTimeEnd={new Date("November 28, 2021 00:00:00")}
        visibleTimeStart={new Date("November 22, 2021 00:00:00")}
        visibleTimeEnd={new Date("November 28, 2021 23:59:59")}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
      />
    );
  }
}
