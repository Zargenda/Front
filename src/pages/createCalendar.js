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
import { Dropdown, DropdownButton } from 'react-bootstrap';

import {
    SCHOOL, NO_SCHOOL, CONVOCATORY, CONTINUE_CONVOCATORY, FESTIVE, CHANGE_DAY, CULM_EXAM,
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY, SECOND_CONVOCATORY, weekDayName
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
    justifyContent: 'space-around',
    color: 'black',
};

const changeDayRow = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    color: 'black',
    marginLeft: '12vh',
};

const date = {
    display: 'flex',
    marginLeft: '2vh',
    fontSize: '14px',
}

const add = {
    display: 'flex',
    marginLeft:'2vh',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#685cf4", 
    color: 'whitesmoke', 
    borderRadius: '6px',
    width: '20px', 
    height: '20px', 
}

const gen = {
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#685cf4", 
    color: 'whitesmoke', 
    borderRadius: '6px',
    padding: '2px 4px'

}

const input = {
    display: 'flex',
    marginLeft: '2vh',
    height: '4vh',
    width: '40vh',
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

const scrollableList = {
    overflow: "auto",
    height: "120px", 
    width: "150vh",
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '6%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: "#685cf4", 
    padding: '10px 2px'

}

const deleteButton = {
    verticalAlign: 'top',
    borderWidth: '0px',
    backgroundColor: "transparent", 
    color: "black", 
    fontWeight:'bold',
    fontSize: '18px',
}

const scrollTitle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '3vh',
    color: 'black',
}

const inputAlign = {
    marginTop: '6px',
    fontSize: '14px',
}

const Form = () => {
    const [startFirstQuarter, setStartFirstQuarter] = useState(new Date());
    const [endFirstQuarter, setEndFirstQuarter] = useState(new Date());
    const [startSecondQuarter, setStartSecondQuarter] = useState(new Date());
    const [endSecondQuarter, setEndSecondQuarter] = useState(new Date());
    const [festiveList, setFestiveList] = useState ([
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" },
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" },
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" },
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" },
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" }
    ]);
    const [changeDayList, setChangeDayList] = useState([
        { date: new Date(), to: "Lunes" }
    ]);
    const [examList, setExamList] = useState([
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" }
    ]);
    const examOptions = ["Pruebas eval continua", "Exámenes 1ª conv", "Exámenes 2ª conv", "Exámenes CULM"]
    const changeDayOptions = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    const calendarArray = [
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
        { date: "2021/10/07", type: SCHOOL, day: THURSDAY, week: 'b2' },
        { date: "2021/10/08", type: SCHOOL, day: FRIDAY, week: 'b2' },
        { date: "2021/10/09", type: FESTIVE, day: SATURDAY, week: 'b2' },
        { date: "2021/10/10", type: FESTIVE, day: SUNDAY, week: 'b2' },
        { date: "2021/10/11", type: FESTIVE, day: MONDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/12", type: FESTIVE, day: TUESDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/13", type: FESTIVE, day: WEDNESDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/14", type: FESTIVE, day: THURSDAY, week: 'a3', comment: "Festividad del Pilar" },
        { date: "2021/10/15", type: CULM_EXAM, day: FRIDAY, week: 'a3', comment: "Exámenes CULM" },
        { date: "2021/10/16", type: FESTIVE, day: SATURDAY, week: 'a3' },
        { date: "2021/10/17", type: FESTIVE, day: SUNDAY, week: 'a3' },
    ];

    const calendarComponent = (title, calendarArray) => {
        return (<div> <br />
            <h2> {title} </h2>
            <br />
            <CalendarTable calendarArray={calendarArray} />
            <br />
        </div>);
    }

    //---FestiveList functions
    const setFestiveStartDate = (i, startDate) => {
        let newList = [...festiveList]
        newList[i].startDate = startDate
        setFestiveList(newList)
    }

    const setFestiveEndDate = (i, endDate) => {
        let newList = [...festiveList];
        newList[i].endDate = endDate;
        setFestiveList(newList);
    }

    const setFestiveComment = (i, comment) => {
        let newList = [...festiveList];
        newList[i].comment = comment;
        setFestiveList(newList);
    }

    const addFestive = () => {
        let newList = [...festiveList];
        newList.push({
            startDate: new Date(),
            endDate: new Date(),
            comment: "Nueva festividad"
        })
        setFestiveList(newList)
    }

    const removeFestive = (index) => {
        let newList = [...festiveList];
        newList.splice(index,1)
        setFestiveList(newList)
    }

    const festiveLabels = festiveList.map((festive, i) => {
        return (
            <div style={row}>
                <input style={input} type="text" value={festive.comment}
                    onChange={(comment) => setFestiveComment(i, comment.target.value)} />
                <pre style={date} >
                    <DatePicker selected={festive.startDate}
                        onChange={(date) => setFestiveStartDate(i, date)}
                        dateFormat="dd/MM/yyyy"
                    /> - <DatePicker selected={festive.endDate}
                        onChange={(date) => setFestiveEndDate(i, date)}
                        dateFormat="dd/MM/yyyy"
                    /> 
                    <button style={deleteButton} onClick={() => removeFestive(i)}> x</button>
                </pre>
            </div>
        );
    });

    //---ChangeDayList functions
    const setChangeDayDate = (i, date) => {
        let newList = [...changeDayList];
        newList[i].date = date;
        setChangeDayList(newList);
    };

    const setChangeDayTo = (i, to) => {
        let newList = [...changeDayList];
        newList[i].to = to;
        setChangeDayList(newList);
    };

    const addChangeDay = () => {
        let newList = [...changeDayList];
        newList.push({
            date: new Date(),
            to: "Lunes"
        });
        setChangeDayList(newList);
    };

    const removeChangeDay = (index) => {
        let newList = [...changeDayList];
        newList.splice(index, 1);
        setChangeDayList(newList);
    };

    const changeDayLabel = changeDayList.map((day, i) => {
        return (
            <div style={changeDayRow}>
                <pre style={date}>
                    <div style={inputAlign}>
                        <DatePicker selected={day.date}
                            onChange={(date) => setChangeDayDate(i, date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    </pre>
                    <DropdownButton id="dropdown-item-button" title={day.to} variant="light">
                    {changeDayOptions.map((option) => (
                            <Dropdown.Item as="button" onClick={(dayTo) => setChangeDayTo(i, dayTo.target.innerText)}>{option}</Dropdown.Item>))}
                    </DropdownButton>
                <pre style={date}>
                    <button style={deleteButton} onClick={() => removeChangeDay(i)}> x</button>
                </pre>
            </div>
        );
    });
    //---ExamList functions
    const setExamStartDate = (i, startDate) => {
        let newList = [...examList];
        newList[i].startDate = startDate;
        setExamList(newList);
    };

    const setExamEndDate = (i, endDate) => {
        let newList = [...examList];
        newList[i].endDate = endDate;
        setExamList(newList);
    };

    const setExamComment = (i, comment) => {
        console.log(comment);

        let newList = [...examList];

        newList[i].comment = comment;
        setExamList(newList);
    };

    const addExam = () => {
        let newList = [...examList];
        newList.push({
            startDate: new Date(),
            endDate: new Date(),
            comment: "Nuevo período"
        });
        setExamList(newList);
    };

    const removeExam = (index) => {
        let newList = [...examList];
        newList.splice(index, 1);
        setExamList(newList);
    };

    const examLabel = examList.map((exam, i) => {
        return (
            <div style={row}>
                <DropdownButton id="dropdown-item-button" title={exam.comment} variant="light">
                    {examOptions.map((option) => (
                        <Dropdown.Item as="button" onClick={(comment) => setExamComment(i, comment.target.innerText)}>{option}</Dropdown.Item>))}
                </DropdownButton>
                <pre style={date} >
                    <pre style={inputAlign}>
                    <DatePicker selected={exam.startDate}
                        onChange={(date) => setExamStartDate(i, date)}
                        dateFormat="dd/MM/yyyy"
                        />
                    </pre>
                    <pre style={inputAlign}> - </pre>
                    <pre style={inputAlign}>
                        <DatePicker selected={exam.endDate}
                            onChange={(date) => setExamEndDate(i, date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </pre>
                    <pre style={date}>
                        <button style={deleteButton} onClick={() => removeExam(i)}> x</button>
                    </pre>

                </pre>
            </div>
        );
    });

    return(
        <div style={body}>
            <div style={title}>
                <h1>Crear Calendario Anual</h1>
            </div>
            <div style={row}>
                <label>Primer cuatrimestre</label>
                <pre style={date}>
                    <DatePicker id="1" selected={startFirstQuarter} 
                        onChange={(date) => setStartFirstQuarter(date)}
                        dateFormat="dd/MM/yyyy"
                    /> - <DatePicker selected={endFirstQuarter}
                            onChange={(date) => setEndFirstQuarter(date)}
                            dateFormat="dd/MM/yyyy"
                    />
                </pre>
            </div>
            <div style={row}>
                <label>Segundo cuatrimestre</label>
                <pre style={date}>
                    <DatePicker selected={startSecondQuarter} 
                        onChange={(date) => setStartSecondQuarter(date)}
                        dateFormat="dd/MM/yyyy"
                    /> - <DatePicker selected={endSecondQuarter}
                        onChange={(date) => setEndSecondQuarter(date)}
                        dateFormat="dd/MM/yyyy"
                    />
                </pre>
            </div>
            <div style={scrollTitle}>
                <label>Festivos</label>
                <button style={add} onClick={addFestive}>+</button>
            </div>
            <br />
            <div style={scrollableList}>
                {festiveLabels}
            </div>
            <div style={scrollTitle}>
                <label>Cambios de día</label>
                <button style={add} onClick={addChangeDay}>+</button>
            </div>
            <br />
            <div style={scrollableList}>
                {changeDayLabel}
            </div>
            <div style={scrollTitle}>
                <label>Evaluaciones</label>
                <button style={add} onClick={addExam}>+</button>
            </div>
            <br />
            <div style={scrollableList}>
                {examLabel}
            </div>
            <br/>
            <br/>
            <div style={scrollTitle}>
                <button style={gen}>Generar</button>
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

export default Form