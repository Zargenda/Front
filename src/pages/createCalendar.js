import React from 'react';
import { useState, useEffect } from "react";
import { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'js-year-calendar';
import 'js-year-calendar/dist/js-year-calendar.css';
import 'js-year-calendar/locales/js-year-calendar.es';
import CalendarTable from '../components/Calendar/calendar';
import LegendHeader from '../components/Calendar/legendHeader';
import {
    getConvertedData, getTypeColor, getBorderStyle, getMonthHeader, getStartYear, getWeekHeader,
    SCHOOL, NO_SCHOOL, CONVOCATORY, CONTINUE_CONVOCATORY, FESTIVE, CHANGE_DAY, CULM_EXAM,
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY, getLegends, SECOND_CONVOCATORY
} from "../components/Calendar/getCalendarData";
const title = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3vh',
    color: 'black',
    marginLeft: '3vh',
    height: '10vh',
};


const row = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3vh',
    color: 'black',
    marginLeft: '12vh',

};

const date = {
    display: 'flex',
    marginLeft: '2vh',

}

const label2 = {
    marginLeft: '8vh',
    display: 'flex',

}
const label3 = {
    marginLeft: '5vh',
    display: 'flex',

}

const label4 = {
    marginLeft: '21vh',
    display: 'flex',

}

const label5 = {
    marginLeft: '13vh',
    display: 'flex',

}

const label6 = {
    marginLeft: '16vh',
    display: 'flex',

}

const add = {
    display: 'flex',
    marginLeft:'2vh',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#685cf4", 
    color: 'whitesmoke', 
    borderRadius: '6px',
    width: '8%', 
    height: '5%', 
}

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

const input = {
    display: 'flex',
    marginLeft: '2vh',
    height: '3vh',
    width: '30vh',
}

const cal = {
    display: 'flex',
    marginLeft:'10vh',
    marginRight: '10vh',
}

const body ={
    padding: '0.5rem calc((100vw - 1000px) / 3)',
}

const mobileTable = {
    display: "flex", 
    height: "400px", 
    width: "340px",
    scrollBehaviour: "smooth",
    overflow: "scroll", 
};

const table = {
    display: "flex", 
    height: "50vh", 
    overflow: "scroll", 
    marginLeft: "1%", 
    marginRight: "1%",
    width: "1200px",
};

const Form = () => {  
    const [startDate, setStartDate] = useState(new Date());
    const calendarArray = [
        { date: "2021-09-13", type: NO_SCHOOL, day: MONDAY, week: 'a1' },
        { date: "2021-09-14", type: NO_SCHOOL, day: TUESDAY, week: 'a1' },
        { date: "2021-09-15", type: SCHOOL, day: WEDNESDAY, week: 'a1' },
        { date: "2021-09-16", type: SCHOOL, day: THURSDAY, week: 'a1' },
        { date: "2021-09-17", type: SCHOOL, day: FRIDAY, week: 'a1' },
        { date: "2021-09-18", type: FESTIVE, day: SATURDAY, week: 'a1' },
        { date: "2021-09-19", type: FESTIVE, day: SUNDAY, week: 'a1' },
        { date: "2021-09-20", type: SCHOOL, day: MONDAY, week: 'b1' },
        { date: "2021-09-21", type: SCHOOL, day: TUESDAY, week: 'b1' },
        { date: "2021-09-22", type: SCHOOL, day: WEDNESDAY, week: 'b1' },
        { date: "2021-09-23", type: SCHOOL, day: THURSDAY, week: 'b1' },
        { date: "2021-09-24", type: SCHOOL, day: FRIDAY, week: 'b1' },
        { date: "2021-09-25", type: FESTIVE, day: SATURDAY, week: 'b1' },
        { date: "2021-09-26", type: FESTIVE, day: SUNDAY, week: 'b1' },
        { date: "2021-09-27", type: FESTIVE, day: MONDAY, week: 'a2', comment: "Festividad de todos los Santos" },
        { date: "2021-09-28", type: CHANGE_DAY, day: MONDAY, week: 'a2', comment: "horario de lunes" },
        { date: "2021-09-29", type: SECOND_CONVOCATORY, day: WEDNESDAY, week: 'a2', comment: "Exámenes 2ª conv" },
        { date: "2021-09-30", type: CONTINUE_CONVOCATORY, day: THURSDAY, week: 'a2', comment: "Pruebas eval continua" },
        { date: "2021-10-01", type: CONVOCATORY, day: FRIDAY, week: 'a2', comment: "Exámenes 1ª conv" },
        { date: "2021-10-02", type: FESTIVE, day: SATURDAY, week: 'a2' },
        { date: "2021-10-03", type: FESTIVE, day: SUNDAY, week: 'a2' },
        { date: "2021-10-04", type: SCHOOL, day: MONDAY, week: 'b2' },
        { date: "2021-10-05", type: SCHOOL, day: TUESDAY, week: 'b2' },
        { date: "2021-10-06", type: SCHOOL, day: WEDNESDAY, week: 'b2' },
        { date: "2021-10-07", type: SCHOOL, day: THURSDAY, week: 'b2' },
        { date: "2021-10-08", type: SCHOOL, day: FRIDAY, week: 'b2' },
        { date: "2021-10-09", type: FESTIVE, day: SATURDAY, week: 'b2' },
        { date: "2021-10-10", type: FESTIVE, day: SUNDAY, week: 'b2' },
        { date: "2021-10-11", type: FESTIVE, day: MONDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021-10-12", type: FESTIVE, day: TUESDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021-10-13", type: FESTIVE, day: WEDNESDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021-10-14", type: FESTIVE, day: THURSDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021-10-15", type: CULM_EXAM, day: FRIDAY, week: 'a3', comment: "Exámenes CULM" },
        { date: "2021-10-16", type: FESTIVE, day: SATURDAY, week: 'a3' },
        { date: "2021-10-17", type: FESTIVE, day: SUNDAY, week: 'a3' },
    ];
    return(
        <div style={body}>
            <div style={title}>
                <h1>Crear Calendario Anual</h1>
            </div>

            <div style={row}>
                <label>Primer cuatrimestre</label>
                <label style={label2} > Inicio </label>
                <p style={date} ><DatePicker id="1" selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>

                <label style={label2} > Fin </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
            </div>

            <div style={row}>
                <label>Segundo cuatrimestre</label>
                <label style={label3} > Inicio </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>

                <label style={label2} > Fin </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
            </div>

            <div class = 'festivo' style={row}>
                <label>Festivos</label>
                <label style={label4} > Inicio </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>

                <label style={label2} > Fin </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
                <input style={input} type="text" name="fiesta"/><button style= {add}>+</button>
            </div>

            <div class = 'festivo' style={row}>
                <label>Cambios de día</label>
                <p style={label5} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
                <input style={input} type="text" name="fiesta"/><button  style= {add}>+</button>
            </div>
            <div class = 'festivo' style={row}>
                <label>Evaluaciones</label>
                <label style={label6} > Inicio </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>

                <label style={label2} > Fin </label>
                <p style={date} ><DatePicker selected = {startDate} 
                onChange={(date) => setStartDate(date)}
                /> </p>
                <input style={input} type="text" name="fiesta"/><button style= {add}>+</button>
            </div>
            <br/>
            <br/>
            <button style={gen}>Generar</button>
            <br/>
            <br />
            <br />
            <h2> Primer semestre </h2>
            <br />
            <CalendarTable calendarArray={calendarArray} />
            <br />
            <h2> Segundo semestre </h2>
            <br />
            <CalendarTable calendarArray={calendarArray} />
            <br />
            <br />
            <LegendHeader />
        </div>

    )
}

export default Form