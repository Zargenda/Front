import React from 'react';
import { useState, useEffect, useRef } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'js-year-calendar';
import 'js-year-calendar/dist/js-year-calendar.css';
import 'js-year-calendar/locales/js-year-calendar.es';
import CalendarTable from '../components/Calendar/calendar';
import LegendHeader from '../components/Calendar/legendHeader';
import "../components/Calendar/calendar.css";
import {
    SCHOOL, NO_SCHOOL, CONVOCATORY, CONTINUE_CONVOCATORY, FESTIVE, CHANGE_DAY, CULM_EXAM,
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY, SECOND_CONVOCATORY, weekDayName
} from "../components/Calendar/getCalendarData";
import axios from 'axios';

const baseUrl = 'https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES'


const title = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3vh',
    color: 'black',
    marginLeft: '1.5vw',
    height: '10vh',
};

const body ={
    padding: '0.5rem calc((100vw - 165vh) / 3)',
}


const UserCalendar = () => {
    const [calendarArray, setCalendarArray] = useState([
        { date: "2021/09/13", type: NO_SCHOOL, day: MONDAY, week: 'a1' },
        { date: "2021/09/14", type: NO_SCHOOL, day: TUESDAY, week: 'a1' },
        { date: "2021/09/15", type: SCHOOL, day: WEDNESDAY, week: 'a1' },
        { date: "2021/09/16", type: SCHOOL, day: THURSDAY, week: 'a1' },
        { date: "2021/09/17", type: SCHOOL, day: FRIDAY, week: 'a1' },
        { date: "2021/09/18", type: FESTIVE, day: SATURDAY, week: 'a1' },
        { date: "2021/09/19", type: FESTIVE, day: SUNDAY, week: 'a1' },
        { date: "2021/09/20", type: SCHOOL, day: MONDAY, week: 'b1' },
        { date: "2021/09/21", type: SCHOOL, day: TUESDAY, week: 'b1' },
        { date: "2021/09/22", type: SCHOOL, day: WEDNESDAY, week: 'b1' },
        { date: "2021/09/23", type: SCHOOL, day: THURSDAY, week: 'b1' },
        { date: "2021/09/24", type: SCHOOL, day: FRIDAY, week: 'b1' },
        { date: "2021/09/25", type: FESTIVE, day: SATURDAY, week: 'b1' },
        { date: "2021/09/26", type: FESTIVE, day: SUNDAY, week: 'b1' },
        { date: "2021/09/27", type: FESTIVE, day: MONDAY, week: 'a2', comment: "Festividad de todos los Santos" },
        { date: "2021/09/28", type: CHANGE_DAY, day: MONDAY, week: 'a2', comment: "horario de lunes" },
        { date: "2021/09/29", type: SECOND_CONVOCATORY, day: WEDNESDAY, week: 'a2', comment: "Exámenes 2ª conv" },
        { date: "2021/09/30", type: CONTINUE_CONVOCATORY, day: THURSDAY, week: 'a2', comment: "Pruebas eval continua" },
        { date: "2021/10/01", type: CONVOCATORY, day: FRIDAY, week: 'a2', comment: "Exámenes 1ª conv" },
        { date: "2021/10/02", type: FESTIVE, day: SATURDAY, week: 'a2' },
        { date: "2021/10/03", type: FESTIVE, day: SUNDAY, week: 'a2' },
        { date: "2021/10/04", type: SCHOOL, day: MONDAY, week: 'b2' },
        { date: "2021/10/05", type: SCHOOL, day: TUESDAY, week: 'b2' },
        { date: "2021/10/06", type: SCHOOL, day: WEDNESDAY, week: 'b2' },
        {
            date: "2021/10/07", type: SCHOOL, day: THURSDAY, week: 'b2',
            comment: " Dias lectivos a efectos de lectura de tesis y tribunales extraordinarios de revisión de exámenes"
        },
        {
            date: "2021/10/08", type: SCHOOL, day: FRIDAY, week: 'b2',
            comment: " Dias lectivos a efectos de lectura de tesis y tribunales extraordinarios de revisión de exámenes"
        },
        { date: "2021/10/09", type: FESTIVE, day: SATURDAY, week: 'b2' },
        { date: "2021/10/10", type: FESTIVE, day: SUNDAY, week: 'b2' },
        { date: "2021/10/11", type: FESTIVE, day: MONDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/12", type: FESTIVE, day: TUESDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/13", type: FESTIVE, day: WEDNESDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/14", type: FESTIVE, day: THURSDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/15", type: CULM_EXAM, day: FRIDAY, week: 'a3', comment: "Exámenes CULM" },
        { date: "2021/10/16", type: FESTIVE, day: SATURDAY, week: 'a3' },
        { date: "2021/10/17", type: FESTIVE, day: SUNDAY, week: 'a3' },
    ]);
    //Request
    const getCalendar = async () => {
        //await axios.post(baseUrl)
        //.then(response=>{
        //  setCalendarArray(data.filter(asginatura=>asginatura.id!==asginaturaSeleccionada.id));
        //})
    }

    const calendarComponent = (title, calendarArray) => {
        return (<div> <br />
            <h2> {title} </h2>
            <br />
            <CalendarTable calendarArray={calendarArray} editable={false} />
            <br />
        </div>);
    };

    return(
        <div style={body}>
            <div style={title}>
                <h1>Calendario Anual</h1>
            </div>
            <br />
            <div>
                {calendarComponent("Primer semestre", calendarArray)}
                {calendarComponent("Segundo semestre", calendarArray)}
                <LegendHeader />
            </div>
        </div>
    )
}

export default UserCalendar