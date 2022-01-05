import React from 'react';
import { useState, useEffect, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'js-year-calendar';
import 'js-year-calendar/dist/js-year-calendar.css';
import 'js-year-calendar/locales/js-year-calendar.es';
import CalendarTable from '../components/Calendar/calendar';
import LegendHeader from '../components/Calendar/legendHeader';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import "../components/Calendar/calendar.css";
import {
    SCHOOL, NO_SCHOOL, CONVOCATORY, CONTINUE_CONVOCATORY, FESTIVE, CHANGE_DAY, CULM_EXAM,
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY, SECOND_CONVOCATORY, 
    ANOTHER_EXAM, examOptions, changeDayOptions, getQuarterArray, getStartYear
} from "../components/Calendar/getCalendarData";
import axios from 'axios';
import { jsPDF } from "jspdf";
import UserCalendar from '../pages/userCalendar';
import html2canvas from 'html2canvas';
import { Inject, ScheduleComponent, WorkWeek, ViewsDirective, ViewDirective, ICalendarExport, DragAndDrop, ResourcesDirective, ResourceDirective } from "@syncfusion/ej2-react-schedule";


const baseUrl = 'https://localhost:8000'


const title = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3vh',
    color: 'black',
    marginLeft: '1.5vw',
    height: '10vh',
};

const row = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'black',
    fontSize:'larger'
};

const changeDayRow = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    color: 'black',
    marginLeft: '4.5vw',
};

const date = {
    display: 'flex',
    margin: 0,
}

const add = {
    display: 'flex',
    marginLeft:'2vw',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#685cf4", 
    color: 'whitesmoke', 
    borderRadius: '1vh',
    width: '3.5vh', 
    height: '3.5vh', 
    fontSize: 'larger'
}

const gen = {
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: "#685cf4", 
    color: 'whitesmoke', 
    borderRadius: '1vh',
    padding: '0.3vh 0.6vh'

}

const input = {
    height: '4vh',
    width: '40vh',
}

const body ={
    padding: '0.5rem calc((100vw - 165vh) / 3)',
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
    height: "23vh", 
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '6%',
    borderWidth: '0.4vh',
    borderStyle: 'solid',
    borderColor: "#685cf4", 
    padding: '1.2vw 0.8vh',
}

const deleteButton = {
    borderWidth: '0vh',
    borderColor: 'white',
    backgroundColor: "transparent", 
    color: "black", 
    fontSize: 'x-large',
    marginBottom: '1vh',
    overflow:'hidden'
}

const scrollTitle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '3vh',
    color: 'black',
    fontSize: 'larger'
}

const buttonRow = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '3vh',
    color: 'black',
    fontSize: 'larger'
}

const inputAlign = {
    fontSize: '2.3vh',
    overflow:'hidden'
}

const dropList = {
    display: 'flex',
    width: '10vh',
}

const doc = new jsPDF();


const Form = () => {
    const [startFirstQuarter, setStartFirstQuarter] = useState(null);
    const [endFirstQuarter, setEndFirstQuarter] = useState(null);
    const [startSecondQuarter, setStartSecondQuarter] = useState(null);
    const [endSecondQuarter, setEndSecondQuarter] = useState(null);
    const [festiveList, setFestiveList] = useState([
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" },
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" },
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" },
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" },
        { startDate: new Date(), endDate: new Date(), comment: "Festividad" }
    ]);
    const [changeDayList, setChangeDayList] = useState([
        { startDate: new Date(), comment: "Lunes" }
    ]);
    const [examList, setExamList] = useState([
        { startDate: new Date(), endDate: new Date(), comment: ANOTHER_EXAM, additional: "" }
    ]);

    const [firstCalendarArray, setFirstCalendarArray] = useState([])
    const [secondCalendarArray, setSecondCalendarArray] = useState([])

    useEffect(() => {
        fetchCalendar();
    }, []);

    async function fetchCalendar() {
        /*await axios.get(baseUrl+)
            .then(response => {
                var calendarArray = response.data;
                setFirstCalendarArray(getQuarterArray(calendarArray, 1))
                setSecondCalendarArray(getQuarterArray(calendarArray,2))
                //console.log("CALENDARARRAY--"+data)            
            });*/
        var calendarArray = ([]);
        setFirstCalendarArray(getQuarterArray(calendarArray, 1));
        setSecondCalendarArray(getQuarterArray(calendarArray, 2))
    }
    //Request
    async function saveCalendar() {
        saveQuarters()
        const examWithoutAdditional = [...examList].map(function (exam) {
            if (exam.comment == ANOTHER_EXAM)
                return { startDate: exam.startDate, endDate: exam.endDate, comment: exam.additional }
            return { startDate: exam.startDate, endDate: exam.endDate, comment: exam.comment }
        })
        const total = festiveList.concat(changeDayList).concat(examWithoutAdditional)
        /*await axios.post(baseUrl, {data:total})
          .then(response=>{
            if(!response.data){
              //error
            }else{
              //éxito
            }
          })*/
        console.log("TOTAL----------"+JSON.stringify(total))
    }

    async function saveQuarters() {
        let quarters = {
             startFirstQuarter: startFirstQuarter,
             endFirstQuarter: endFirstQuarter,
             startSecondQuarter: startSecondQuarter,
             endSecondQuarter: endSecondQuarter
        }
        console.log("QUARTERS---"+quarters)
        /*await axios.post(baseUrl, quaters)
          .then(response=>{
            if(!response.data){
              //error
            }else{
              //éxito
            }
          })*/
        //history.push("/");
    }

    //Scroll list
    const scrollFestive = useRef(null);
    const scrollExam = useRef(null);
    const scrollChange = useRef(null);
    function scrollToBottom(scroll) {
        let bottom = scroll.current.scrollHeight - scroll.current.clientHeight;
        scroll.current.scrollTo(0, bottom);

    }
    useEffect(() => {
        scrollToBottom(scrollFestive)
        scrollToBottom(scrollExam)
        scrollToBottom(scrollChange)
    });

    //---FestiveList functions
    const setFestiveStartDate = (i, startDate) => {
        let newList = [...festiveList];
        newList[i].startDate = startDate;
        setFestiveList(newList);
    };

    const setFestiveEndDate = (i, endDate) => {
        let newList = [...festiveList];
        newList[i].endDate = endDate;
        setFestiveList(newList);
    };

    const setFestiveComment = (i, comment) => {
        let newList = [...festiveList];
        newList[i].comment = comment;
        setFestiveList(newList);
    };

    const addFestive = () => {
        let newList = [...festiveList];
        newList.push({
        });
        setFestiveList(newList);
    };

    const removeFestive = (index) => {
        let newList = [...festiveList];
        newList.splice(index, 1);
        setFestiveList(newList);
    };

    const festiveLabels = festiveList.map((festive, i) => {
        return (
            <div style={row}>
                <input style={input} type="text" value={festive.comment} placeholder="Descripción"
                    onChange={(comment) => setFestiveComment(i, comment.target.value)} />
                <pre style={date}>
                    <pre style={inputAlign}>
                        <DatePicker selected={festive.startDate}
                            onChange={(date) => setFestiveStartDate(i, date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Inicio"
                        />
                    </pre>
                    <pre style={inputAlign}> - </pre>
                    <pre style={inputAlign}>
                        <DatePicker selected={festive.endDate}
                            onChange={(date) => setFestiveEndDate(i, date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Fin"
                        /> 
                    </pre>
                    <pre style={date}>
                        <button style={deleteButton} onClick={() => removeFestive(i)}> x</button>
                    </pre>
                </pre>
            </div>
        );
    });

    //---ChangeDayList functions
    const setChangeDayDate = (i, date) => {
        let newList = [...changeDayList];
        newList[i].startDate = date;
        setChangeDayList(newList);
    };

    const setChangeDayComment = (i, comment) => {
        let newList = [...changeDayList];
        newList[i].comment = comment;
        setChangeDayList(newList);
    };

    const addChangeDay = () => {
        let newList = [...changeDayList];
        newList.push({
            comment: "Lunes"
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
                        <DatePicker selected={day.startDate}
                            onChange={(date) => setChangeDayDate(i, date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Día a cambiar"
                            wrapperClassName="datepicker"
                        />

                    </div>
                    </pre>
                    <DropdownButton id="dropdown-item-button" title={day.comment} variant="light">
                    {changeDayOptions.map((option) => (
                            <Dropdown.Item as="button" onClick={(dayTo) => setChangeDayComment(i, dayTo.target.innerText)}>{option}</Dropdown.Item>))}
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

    const setExamAdditional = (i, comment) => {
        let newList = [...examList];
        newList[i].additional = comment;
        setExamList(newList);
    };

    const addExam = () => {
        let newList = [...examList];
        newList.push({
            comment: ANOTHER_EXAM
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
                <div style={dropList}>
                <DropdownButton id="dropdown-item-button" title={exam.comment} variant="light">
                    {examOptions.map((option) => (
                        <Dropdown.Item as="button" onClick={(comment) => setExamComment(i, comment.target.innerText)}>{option}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                {exam.comment == ANOTHER_EXAM ? <input style={input} type="text" value={exam.additional} placeholder="Descripción"
                    onChange={(comment) => setExamAdditional(i, comment.target.value)} /> :
                    <div style={input}/>
                    }
                <pre style={date}>
                    <pre style={inputAlign}>
                    <DatePicker selected={exam.startDate}
                        onChange={(date) => setExamStartDate(i, date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Inicio"
                        />
                    </pre>
                    <pre style={inputAlign}> - </pre>
                    <pre style={inputAlign}>
                        <DatePicker selected={exam.endDate}
                            onChange={(date) => setExamEndDate(i, date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Fin"
                        />
                    </pre>
                    <pre style={date}>
                        <button style={deleteButton} onClick={() => removeExam(i)}> x</button>
                    </pre>
                </pre>
            </div>
        );
    });

    const calendarComponent = (title, calendarArray, key) => {
        return (<div id={key}> <br />
            <h2> {title} </h2>
            <br />
            <CalendarTable calendarArray={calendarArray} editable={true} />
            <br />
        </div>);
    };

    const CalendarRender = () => (<div id="Calendar">
        {firstCalendarArray.length > 0 ? calendarComponent("Primer semestre", firstCalendarArray) : null}
        {secondCalendarArray.length > 0 ? calendarComponent("Segundo semestre", secondCalendarArray) : null}
        {firstCalendarArray.length > 0 ? <LegendHeader /> : null}
    </div>)

    const savePdf = () => {
        if (firstCalendarArray.length > 0) {
            const input = document.getElementById('Calendar');
            html2canvas(input)
                .then((canvas) => {
                    let imgWidth = 208;
                    let imgHeight = canvas.height * imgWidth / canvas.width;
                    const year = getStartYear();
                    const imgData = canvas.toDataURL('img/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(imgData, 'PNG', imgWidth * 0.09, imgHeight * 0.01, imgWidth * 0.8, imgHeight * 0.8);
                    pdf.save("calendario_" + (year - 1) + "_" + year + ".pdf");
                });
        }
    }
    const [scheduleObj, setScheduleObj] = useState(new ScheduleComponent())
    const saveICS = () => {
        
    }
    
    return(
        <div style={body}>
            <div style={title}>
                <h1>Crear Calendario Anual</h1>
            </div>
            <div style={row}>
                <label>Primer cuatrimestre</label>
                <pre style={date}>
                    <pre style={inputAlign}>
                        <DatePicker id="1" selected={startFirstQuarter}
                            onChange={(date) => setStartFirstQuarter(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Inicio"
                        />
                    </pre>
                    <pre style={inputAlign}> - </pre>
                    <pre style={inputAlign}>
                        <DatePicker selected={endFirstQuarter}
                            onChange={(date) => setEndFirstQuarter(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Fin"
                        />
                    </pre>
                </pre>
            </div>
            <br/>
            <div style={row}>
                <label>Segundo cuatrimestre</label>
                <pre style={date}>
                    <pre style={inputAlign}>
                        <DatePicker selected={startSecondQuarter}
                            onChange={(date) => setStartSecondQuarter(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Inicio"
                        /> 
                    </pre>
                    <pre style={inputAlign}> - </pre>
                    <pre style={inputAlign}>
                        <DatePicker selected={endSecondQuarter}
                            onChange={(date) => setEndSecondQuarter(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Fin"
                        />
                    </pre>
                </pre>
            </div>
            <div style={scrollTitle}>
                <label>Festivos</label>
                <button style={add} onClick={addFestive}>+</button>
            </div>
            <br />
            <div style={scrollableList} ref={scrollFestive}>
                {festiveLabels}
            </div>
            <div style={scrollTitle}>
                <label>Cambios de día</label>
                <button style={add} onClick={addChangeDay}>+</button>
            </div>
            <br />
            <div style={scrollableList} ref={scrollChange}>
                {changeDayLabel}
            </div>
            <div style={scrollTitle}>
                <label>Evaluaciones</label>
                <button style={add} onClick={addExam}>+</button>
            </div>
            <br />
            <div style={scrollableList} ref={scrollExam}>
                {examLabel}
            </div>
            <br/>
            <br/>
            <div style={buttonRow}>
                <button onClick={savePdf} style={gen}>Exportar a PDF</button>
                <button onClick={() => saveCalendar()} style={gen}  >Generar</button>
                {/*<button onClick={saveICS} style={gen}>Exportar a iCalendar</button>*/}
            </div>
            <br />
            <CalendarRender/>
        </div>
    )
}

export default Form