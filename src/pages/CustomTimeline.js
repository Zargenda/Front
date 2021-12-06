import React, { Component } from "react";
import { Inject, ScheduleComponent, Week, WorkWeek, ViewsDirective, ViewDirective, ICalendarExport, DragAndDrop} from "@syncfusion/ej2-react-schedule";


const clickableButton = {
  display: 'flex',
  marginLeft:'70vh',
  alignItems: 'center', 
  justifyContent: 'center', 
  backgroundColor: "#685cf4", 
  color: 'whitesmoke', 
  borderRadius: '6px',
  width: '13%', 
  height: '5%', 
}

const itemInit = new Date("November 22, 2021 00:00:00")
const itemEnd = new Date("November 22, 2021 24:00:00")


export default class App extends Component {
  constructor(props) {
    super(props);
    const scheduleObj = null
  }

  onExportClick() {    
      this.scheduleObj.exportToICalendar();
  }

  render() {

    return (
      <div>
        <button onClick={this.onExportClick.bind(this)} style={clickableButton}> Exportar a iCalendar </button>
        <ScheduleComponent currentView='WorkWeek' startHour='09:00' endHour='21:00' ref={(schedule) => this.scheduleObj = schedule} >
          
          <ViewsDirective>
            <ViewDirective option='WorkWeek' />
          </ViewsDirective>
          <Inject services={[Week, WorkWeek, ICalendarExport, DragAndDrop]}/>
        </ScheduleComponent>
      </div>
    );
  }
}
