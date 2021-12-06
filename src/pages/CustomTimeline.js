import React, { Component } from "react";
import moment from "moment";


import generateFakeData from "./generate-fake-data";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline/lib";

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

const itemProperties = {
  onDoubleClick: () => { console.log('You clicked double!') },
  style: {
    background: 'blue'
  }
}

const itemInit = new Date("November 22, 2021 00:00:00")
const itemEnd = new Date("November 22, 2021 24:00:00")
const groupHeight = 120
export default class App extends Component {
  constructor(props) {
    super(props);

    const groups = [{ id: 1, title: '8-9', height: groupHeight }, { id: 2, title: '9-10', height: groupHeight }, { id: 3, title: '10-11', height: groupHeight }, { id: 4, title: '11-12', height: groupHeight }, { id: 5, title: '12-13', height: groupHeight }, { id: 6, title: '13-14', height: groupHeight }, { id: 7, title: '14-15', height: groupHeight }, { id: 8, title: '15-16', height: groupHeight },{ id: 9, title: '16-17', height: groupHeight }, { id: 10, title: '17-18', height: groupHeight }, { id: 11, title: '18-19', height: groupHeight }, { id: 12, title: '19-20', height: groupHeight }, { id: 13, title: '20-21', height: groupHeight }]
    const items = [{ id: 1, title: 'Gestión de proyecto software', group: 2, start: itemInit, end: itemEnd, canResize: false, canChangeGroup: true, itemProps: itemProperties},{ id: 2, title: 'Laboratorio IS', group: 3, start: itemInit, end: itemEnd, canResize: false, canChangeGroup: true, itemProps: itemProperties}]
    //const { groups, items } = generateFakeData();
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

  };

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        fullUpdate
        stackItems={true}
        itemTouchSendsClick={false}
        itemHeightRatio={1}
        canMove={true}
        canResize={false}
        defaultTimeStart={new Date("November 22, 2021 00:00:00")}
        defaultTimeEnd={new Date("November 28, 2021 00:00:00")}
        visibleTimeStart={new Date("November 22, 2021 00:00:00")}
        visibleTimeEnd={new Date("November 28, 2021 23:59:59")}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        itemTimeStartKey={"start_time"}
        lineHeight={10}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Hora</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    );
  }
}
