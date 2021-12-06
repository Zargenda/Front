import React, { Component } from "react";
import { Inject, ScheduleComponent, WorkWeek, ViewsDirective, ViewDirective, ICalendarExport, DragAndDrop, ResourcesDirective, ResourceDirective} from "@syncfusion/ej2-react-schedule";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';

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

  calendarCollections = [
    { CalendarText: 'Teoría', CalendarId: 1, CalendarColor: '#55B7EE' },
    { CalendarText: 'Prácticas', CalendarId: 2, CalendarColor: '#FB84F0' },
    { CalendarText: 'Problemas', CalendarId: 3, CalendarColor: '#55B7EE' },
    { CalendarText: 'Seminario', CalendarId: 4, CalendarColor: '#686464' }
  ];


  contentTemplate = (props) => {
    return (
      <div className="quick-info-content">
        {props.elementType === 'cell' ?
          <div className="e-cell-content">
            <div className="content-area">
              <TextBoxComponent id="title" ref={(textbox) => this.titleObj = textbox} placeholder="Nombre" />
            </div>
            <div className="content-area">
              <DropDownListComponent id="eventType" ref={(ddl) => this.eventTypeObj = ddl} dataSource={this.calendarCollections}
                fields={{ text: "CalendarText", value: "CalendarId" }} placeholder="Tipo" index={0} popupHeight="200px" />
            </div>
          </div>
          :
          <div className="event-content">
            <div className="meeting-type-wrap">
              <label>Nombre</label>:
              <span>{props.Subject}</span>
            </div>
            <div className="meeting-subject-wrap">
              <label>Hora</label>:
              <span>{this.StartTime}</span>
            </div>
          </div>
        }
      </div>
    );
  }

  getEventType (data) {
    const resourceData = this.getResourceData(data);
    let calendarText = '';
    if (resourceData) {
      calendarText = resourceData.CalendarText.toString();
    }
    return calendarText;
  }

  getResourceData(data) {
    let resources = this.scheduleObj.getResourceCollections().slice(-1)[0];
    //let resourceData = (resources.dataSource).filter((resource) =>
    //  resource.CalendarId === data.CalendarId)[0];
    //return resourceData;
  }

  buttonClickActions = (e) => {
    const quickPopup = closest(e.target, '.e-quick-popup-wrapper');
    const getSlotData = () => {
      let cellDetails = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
      if (isNullOrUndefined(cellDetails)) {
        cellDetails = this.scheduleObj.getCellDetails(this.scheduleObj.activeCellsData.element);
      }
      const addObj = {};
      addObj.Id = this.scheduleObj.getEventMaxID();
      addObj.Subject = isNullOrUndefined(this.titleObj.value) ? 'Add title' : this.titleObj.value;
      addObj.StartTime = new Date(+cellDetails.startTime);
      addObj.EndTime = new Date(+cellDetails.endTime);
      addObj.IsAllDay = cellDetails.isAllDay;
      addObj.CalendarId = this.eventTypeObj.value;
      return addObj;
    };
    if ((e.target).id === 'add') {
      const addObj = getSlotData();
      this.scheduleObj.addEvent(addObj);
    } else if ((e.target).id === 'delete') {
      const eventDetails = this.scheduleObj.activeEventData.event;
      let currentAction = 'Delete';
      if (eventDetails.RecurrenceRule) {
        currentAction = 'DeleteOccurrence';
      }
      this.scheduleObj.deleteEvent(eventDetails, currentAction);
    } else {
      const isCellPopup = (quickPopup.firstElementChild).classList.contains('e-cell-popup');
      const eventDetails = isCellPopup ? getSlotData() :
        this.scheduleObj.activeEventData.event ;
      let currentAction = isCellPopup ? 'Add' : 'Save';
      if (eventDetails.RecurrenceRule) {
        currentAction = 'EditOccurrence';
      }
      this.scheduleObj.openEditor(eventDetails, currentAction, true);
    }
    this.scheduleObj.closeQuickInfoPopup();
  }

  footerTemplate = (props) =>  {
    return (
      <div className="quick-info-footer">
        {props.elementType == "cell" ?
          <div className="cell-footer">
            <ButtonComponent id="more-details" cssClass='e-flat' content="Más detalles" onClick={this.buttonClickActions.bind(this)} />
            <ButtonComponent id="add" cssClass='e-flat' content="Crear" isPrimary={true} onClick={this.buttonClickActions.bind(this)} />
          </div>
          :
          <div className="event-footer">
            <ButtonComponent id="delete" cssClass='e-flat' content="Borrar" onClick={this.buttonClickActions.bind(this)} />
            <ButtonComponent id="more-details" cssClass='e-flat' content="Más detalles" isPrimary={true} onClick={this.buttonClickActions.bind(this)} />
          </div>
        }
      </div>
    );
  }

  onExportClick() {    
      this.scheduleObj.exportToICalendar();
  }

  render() {

    return (
      <div>
        <button onClick={this.onExportClick.bind(this)} style={clickableButton}> Exportar a iCalendar </button>
        <ScheduleComponent currentView='WorkWeek' startHour='09:00' endHour='21:00' ref={(schedule) => this.scheduleObj = schedule} 
        quickInfoTemplates={{
          content: this.contentTemplate.bind(this),
          footer: this.footerTemplate.bind(this)
        }} >
          <ResourcesDirective>
              <ResourceDirective field='CalendarId' title='Calendars' name='Calendars' dataSource={this.calendarCollections}
                 textField='CalendarText' idField='CalendarId' colorField='CalendarColor'>
              </ResourceDirective>
            </ResourcesDirective>
           <ViewsDirective>
            <ViewDirective option='WorkWeek' />
          </ViewsDirective>
          <Inject services={[WorkWeek, ICalendarExport, DragAndDrop]}/>
        </ScheduleComponent>
      </div>
    );
  }
}
