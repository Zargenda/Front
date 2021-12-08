import React, { Component } from "react";
import { Inject, ScheduleComponent, WorkWeek, ViewsDirective, ViewDirective, ICalendarExport, DragAndDrop, ResourcesDirective, ResourceDirective} from "@syncfusion/ej2-react-schedule";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-alert'

const clickableButton = {
  display: 'flex',
  justifyContent: 'center', 
  backgroundColor: "#685cf4", 
  color: 'whitesmoke', 
  borderRadius: '6px',
  width: '20%', 
  height: '5%', 
}
const row = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: '3vh',
  color: 'black',
  justifyContent: 'center', 
};
const gen = {
  display: 'flex',
  marginLeft:'70vh',
  alignItems: 'center', 
  justifyContent: 'center', 
  backgroundColor: "#685cf4", 
  color: 'whitesmoke', 
  borderRadius: '6px',
  width: '8%', 
  height: '5%', 
}

export default class App extends Component {
  constructor(props) {
    super(props);
    const scheduleObj = null

    this.data = [{
          Id: 1,
          Subject: 'Laboratorio ing software',
          StartTime: new Date(2021, 8, 14, 9, 30),
          EndTime: new Date(2021, 8, 14, 11, 0),
          CalendarId: 1,
          Description: "Aula 1.1"
      }, {
          Id: 2,
          Subject: 'Sistemas legados',
          StartTime: new Date(2021, 8, 13, 9, 30),
          EndTime: new Date(2021, 8, 13, 11, 0),
          CalendarId: 2
      }, {
          Id: 3,
          Subject: 'Seguridad informática',
          StartTime: new Date(2021, 8, 13, 9, 30),
          EndTime: new Date(2021, 8, 13, 11, 0),
          CalendarId: 1
      }];
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
                fields={{ text: "CalendarText", value: "CalendarId" }} placeholder="Tipo" popupHeight="200px" />
            </div>
          </div>
          :
          <div className="event-content">
            <div className="meeting-subject-wrap">
              <span>{props.Description}</span>
            </div>
          </div>
        }
      </div>
    );
  }

  editorTemplate = (props) => {
    return ((props !== undefined) ? <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
      <tr><td className="e-textlabel">Nombre</td><td style={{ colspan: '4' }}>
        <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }} />
      </td></tr>
      <tr><td className="e-textlabel">Tipo</td><td style={{ colspan: '4' }}>
      <DropDownListComponent id="eventType" ref={(ddl) => this.eventTypeObj = ddl} name="CalendarId" data-name="CalendarId" className="e-field e-input" dataSource={this.calendarCollections}
                fields={{ text: "CalendarText", value: "CalendarId" }} id={1} placeholder="Tipo"  popupHeight="200px" />
      </td></tr>
      <tr><td className="e-textlabel">Desde</td><td style={{ colspan: '4' }}>
        <DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="StartTime" value={new Date(props.startTime || props.StartTime)}
          className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">Hasta</td><td style={{ colspan: '4' }}>
        <DateTimePickerComponent id="EndTime" format='dd/MM/yy hh:mm a' data-name="EndTime" value={new Date(props.endTime || props.EndTime)}
          className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">Clase</td><td style={{ colspan: '4' }}>
        <input id="Description" className="e-field e-input" name="Description" rows={3} cols={50}
          style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></input>
      </td></tr></tbody></table > : <div></div>);
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
      addObj.Subject = isNullOrUndefined(this.titleObj.value) ? 'Nueva asignatura' : this.titleObj.value;
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

  footerEditTemplate = (props) =>  {
    return (
      <div className="quick-info-footer">
          <div className="event-footer">
            <ButtonComponent id="edit" cssClass='e-flat' content="Guardar"  onClick={this.buttonClickActions.bind(this)} />
          </div>
      </div>
    );
  }

  onExportClick() {    
      this.scheduleObj.exportToICalendar();
  }

  onCreateClick() {    
      alert("El calendario se ha creado con éxito.")
  }

  getGenre(genre){
    var calendarId = 1
    switch(genre){
      case "Teoría":
        calendarId = 1
        break
      case "Prácticas":
        calendarId = 2
        break
      case "Problemas":
        calendarId = 3
        break
      case "Seminario":
        calendarId = 4
        break
    }
    return calendarId
  }

  getDay(day){
    var dayNumber = 13
    switch(day){
      case "Lunes":
        dayNumber = 13
        break
      case "Martes":
        dayNumber = 14
        break
      case "Miércoles":
        dayNumber = 15
        break
      case "Jueves":
        dayNumber = 16
        break
      case "Viernes":
        dayNumber = 17
        break
    }
    return dayNumber
  }

  getRecurrence(frecuency, day){
    var interval = "6"
    var byday = "WE"
    var recurrence = "FREQ=DAILY;BYDAY=WE;INTERVAL=14;"

    switch(day){
      case "Lunes":
        byday = "MO"
        break
      case "Martes":
        byday = "TU"
        break
      case "Miércoles":
        byday = "WE"
        break
      case "Jueves":
        byday = "TH"
        break
      case "Viernes":
        byday = "FR"
        break
    }
    switch(frecuency){
      case "Semanal":
        interval = 6
        break
      case "Quincenal":
        interval = 14
        break
      case "Puntual":
        return "Once"
    }
    recurrence = "FREQ=DAILY;BYDAY="+byday+";INTERVAL="+interval+";"
    return recurrence
  }

  async onAddClick() {    
    var subjectName = await AsyncStorage.getItem("selectedSubject")
    var startTime = await AsyncStorage.getItem("startClock")
    var endTime = await AsyncStorage.getItem("endClock")
    var genre = await AsyncStorage.getItem("selectedGenre")
    var day = await AsyncStorage.getItem("selectedDay")
    var location = await AsyncStorage.getItem("selectedLocation")
    var frecuency = await AsyncStorage.getItem("selectedFrecuency")
    var newId = this.data.at(-1).Id + 1
    var calendarId = 0
    var dayNumber = 13
    var startHour = parseInt(startTime.slice(0, 2))
    var startMin = parseInt(startTime.slice(3, 5))
    var endHour = parseInt(endTime.slice(0, 2))
    var endMin = parseInt(endTime.slice(3, 5))

    calendarId = this.getGenre(genre)
    dayNumber = this.getDay(day)
    var recurrence = this.getRecurrence(frecuency, day)
    
    var newSubject = {
        Id: newId,
        Subject: (calendarId != 4) ? subjectName : "Seminario",
        StartTime: new Date(2021, 8, dayNumber, startHour, startMin),
        EndTime: new Date(2021, 8, dayNumber, endHour, endMin),
        CalendarId: calendarId,
        Description: location,
        RecurrenceRule: (recurrence != "Once") ? recurrence : null
    }
    this.data.push(newSubject)
  }

  render() {

    return (
      
      <div>
        <button onClick={this.onAddClick.bind(this)} style={gen}>Añadir</button>
            <br/>
            <br/>
            <br/>
        <div style={row}>
          <button onClick={this.onExportClick.bind(this)} style={clickableButton}> Exportar a iCalendar </button>
          <button onClick={this.onCreateClick.bind(this)} style={clickableButton}> Guardar horario </button>
        </div>
        <ScheduleComponent currentView='WorkWeek' selectedDate={new Date(2021, 8, 13)} eventSettings={{ dataSource: this.data }} startHour='09:00' endHour='21:00' ref={(schedule) => this.scheduleObj = schedule} 
        quickInfoTemplates={{
          content: this.contentTemplate.bind(this),
          footer: this.footerTemplate.bind(this)
        }}  editorTemplate={this.editorTemplate.bind(this)}>
          <ResourcesDirective>
              <ResourceDirective field='CalendarId' title='Calendars' name='Calendars' dataSource={this.calendarCollections}
                 textField='CalendarText' idField='CalendarId' colorField='CalendarColor' >
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
