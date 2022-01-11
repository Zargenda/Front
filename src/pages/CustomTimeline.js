import React, { Component } from "react";
import { Inject, ScheduleComponent, WorkWeek, ViewsDirective, ViewDirective, ICalendarExport, DragAndDrop, ResourcesDirective, ResourceDirective} from "@syncfusion/ej2-react-schedule";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { addClass, Browser, closest, extend, Internationalization, isNullOrUndefined, removeClass, remove, compile } from '@syncfusion/ej2-base';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Alert } from 'react-alert'
import {ScheduleData} from './scheduleData';
import axios from 'axios';

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
    const data = null    
    {}
    var i = this.props.data
    this.state={
      data : i,
      ctx: undefined
    };      
  }

  componentWillUpdate() {
    const newContext = this.context
    const contextAux = this.state.ctx
    
    if(contextAux){ 
      console.log("El contexto antiguo es_ "+JSON.stringify(contextAux.selectedGrade))
      console.log("El contexto nuevo es_ "+JSON.stringify(newContext.selectedGrade))
      if(contextAux.selectedCareer[0] != newContext.selectedCareer[0] || contextAux.selectedGrade[0] !=
        newContext.selectedGrade[0] || contextAux.selectedSemester[0] != newContext.selectedSemester[0]
        || contextAux.selectedGroup[0] != newContext.selectedGroup[0]){
            const dataAux = []
            this.state.data = dataAux
            this.setState({data: dataAux, ctx: newContext})
            console.log("El contexto es final es "+JSON.stringify(this.state.data)) 
        }        
      }else{
            this.setState({data: this.state.data, ctx: newContext})
            console.log("El data final es "+JSON.stringify(this.state.data)) 
      }
    }

  calendarCollections = [
    { CalendarText: 'Teoría', CalendarId: 1, CalendarColor: '#55B7EE' },
    { CalendarText: 'Prácticas', CalendarId: 2, CalendarColor: '#FB84F0' },
    { CalendarText: 'Problemas', CalendarId: 3, CalendarColor: '#55B7EE' },
    { CalendarText: 'Seminario', CalendarId: 4, CalendarColor: '#686464' }
  ];

  intl = new Internationalization();
  
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
              <br></br>
              <span>{props.Frecuency}</span>
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
        <DateTimePickerComponent id="StartTime" strictMode={true} min={new Date(2021, 8, 13)} max={new Date(2021, 8, 17)} format='dd/MM/yy hh:mm a' data-name="StartTime" value={new Date(props.startTime || props.StartTime)}
          className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">Hasta</td><td style={{ colspan: '4' }}>
        <DateTimePickerComponent id="EndTime" strictMode={true} min={new Date(2021, 8, 13)} max={new Date(2021, 8, 17)} format='dd/MM/yy hh:mm a' data-name="EndTime" value={new Date(props.endTime || props.EndTime)}
          className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">Clase</td><td style={{ colspan: '4' }}>
        <input id="Description" className="e-field e-input" name="Description" rows={3} cols={50}
          style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></input>
      </td></tr></tbody></table > : <div></div>);
  }

  getEventType (data) {
    const resourceData = this.getResourceData(this.state.data);
    let calendarText = '';
    if (resourceData) {
      calendarText = resourceData.CalendarText.toString();
    }
    return calendarText;
  }

  async loadSchedule(){    
    //var dataAux = [{"idPadre":1,"Id":1,"Subject":"Laboratorio ing software","StartTime":"2021-09-14T07:30:00.000+00:00","EndTime":"2021-09-14T09:00:00.000+00:00","CalendarId":1,"Description":"Aula 1.1","Frecuency":"Semanal"},{"idPadre":1,"Id":2,"Subject":"Sistemas legados","StartTime":"2021-09-13T07:30:00.000+00:00","EndTime":"2021-09-13T09:00:00.000+00:00","CalendarId":2,"Description":"Aula 1.3","Frecuency":"Semanal"},{"idPadre":1,"Id":3,"Subject":"Seguridad informática","StartTime":"2021-08-13T07:30:00.000+00:00","EndTime":"2021-08-13T09:00:00.000+00:00","CalendarId":1,"Description":"Aula 3.1","Frecuency":"Semanal"}]
    
    await axios.get("http://localhost:8080/horarios/getHorario?nombrePlan="+this.context.selectedCareer[0]+"&semestre="+this.context.selectedSemester[0]+"&curso="+this.context.selectedGrade[0]+"&grupo="+this.context.selectedGroup[0])
            .then(response => {
                if(!response.data){
                    console.log("Error fetching data")
                }else{              
                  this.state.data = []
                  var dataAux = response.data
                  var dataAux2 = this.state.data
                  var dataAux3
                  for (var i = 0; i < dataAux.length; i++) {  
                    dataAux3 = dataAux[i]
                    dataAux3.StartTime = this.toJavascriptDate(dataAux[i].StartTime)
                    dataAux3.EndTime = this.toJavascriptDate(dataAux[i].EndTime)
                    dataAux2.push(dataAux3)          
                  }
                  this.state.data = dataAux2
                  this.setState(dataAux2)
                }                           
            });    
  }

  toJavascriptDate(s) {
    s = s + ''
    var b = s.split(/\D+/);
    var anyo = parseInt(b[0])
    var mes = parseInt(b[1])
    var dia = parseInt(b[2])
    var hora = parseInt(b[3])
    var minuto = parseInt(b[4])
    console.log("La fecha es "+s)
    //console.log("El mes es "+mes)
    //console.log("La hora es "+hora)
    var dateAux = new Date(Date.UTC(anyo, mes-1, dia, hora, minuto, 0))
    return dateAux;
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
      this.scheduleObj.deleteEvent(eventDetails, currentAction);
    } else {
      const isCellPopup = (quickPopup.firstElementChild).classList.contains('e-cell-popup');
      const eventDetails = isCellPopup ? getSlotData() :
        this.scheduleObj.activeEventData.event ;
      let currentAction = isCellPopup ? 'Add' : 'Save';
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

  async onCreateClick() {   
    const map = new Map(); 
    var id
    if(this.context.scheduleData.length == 0){
        id = 0
    }else{
      id = this.state.data[0].idPadre
    }
    console.log("El length es: "+this.context.scheduleData.length)
    var scheduleAux = {id: id, curso: this.context.selectedGrade[0], 
      semestre: this.context.selectedSemester[0], 
      grupo: this.context.selectedGroup[0],
      nombrePlan: this.context.selectedCareer[0]
    }
    var dataAux = this.state.data
     for (var i = 0; i < dataAux.length; i++) {
       dataAux[i].StartTime = dataAux[i].StartTime.toISOString()
       dataAux[i].EndTime = dataAux[i].EndTime.toISOString()      
       dataAux[i].idPadre = 1
     }
    scheduleAux.horarioAsignaturas = dataAux
     await axios.post('http://localhost:8080/horarios/uploadHorarioA',
                 scheduleAux
             ).then(response => {
               if(!response.data){
                   console.log("Error fetching data")
               }else{
                   alert("El calendario se ha creado con éxito.")
                  console.log("Success: "+JSON.stringify(response))
               }                           
           });
      
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

  dateHeaderTemplate = (props) => {
    var dateArray = this.getDateHeaderText(props.date).split(" ");
    return (<div><div>{this.parseDay(dateArray[1])}</div></div>);
  }

  getDateHeaderText(value) {
    return this.intl.formatDate(value, { skeleton: 'Ed' });
  }

  parseDay(day){
    switch(day){
      case "Mon":
        return "Lunes"
      case "Tue":
        return "Martes"
      case "Wed":
        return "Miércoles"
      case "Thu":
        return "Jueves"
      case "Fri":
        return "Viernes"
    }

  }
  
  async onAddClick() {        
    var subjectName = this.context.selectedSubject[0]    
    var startTime = this.context.startClock[0]   
    var endTime = this.context.endClock[0]   
    var genre = this.context.selectedGenre[0]   
    var day = this.context.selectedDay[0]   
    var location = this.context.selectedLocation[0]   
    var frecuency = this.context.selectedFrecuency[0]   
    if(this.state.data.length > 0){
      var newId = this.state.data.at(-1).Id + 1
    }
    var calendarId = 0
    var dayNumber = 13
    var startHour = parseInt(startTime.slice(0, 2))
    var startMin = parseInt(startTime.slice(3, 5))
    var endHour = parseInt(endTime.slice(0, 2))
    var endMin = parseInt(endTime.slice(3, 5))
    calendarId = this.getGenre(genre)
    dayNumber = this.getDay(day)
    var dataAux = this.state.data
    var newSubject = {
        Id: (dataAux.length == 0) ? 1 : newId,
        Subject: (calendarId != 4) ? subjectName : "Seminario",
        StartTime: new Date(2021, 8, dayNumber, startHour, startMin),
        EndTime: new Date(2021, 8, dayNumber, endHour, endMin),
        CalendarId: calendarId,
        Description: location,
        Frecuency: frecuency,
    }
    
    dataAux.push(newSubject)
    this.setState(dataAux)
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
          <button onClick={this.loadSchedule.bind(this)} style={clickableButton}> Cargar horario </button>
        </div>
        <ScheduleComponent currentView='WorkWeek' showHeaderBar={false} selectedDate={new Date(2021, 8, 13)} eventSettings={{ dataSource: this.state.data }} startHour='09:00' endHour='21:00' ref={(schedule) => this.scheduleObj = schedule} 
         dateHeaderTemplate={this.dateHeaderTemplate.bind(this)} quickInfoTemplates={{
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

App.contextType = ScheduleData
