import React from 'react';
import { useState, useEffect, useRef } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'js-year-calendar';
import 'js-year-calendar/dist/js-year-calendar.css';
import 'js-year-calendar/locales/js-year-calendar.es';
import CalendarTable from '../components/Calendar/calendar';
import LegendHeader from '../components/Calendar/legendHeader';
import "../components/Calendar/calendar.css";
import { getQuarterArray, getStartYear} from "../components/Calendar/getCalendarData";
import axios from 'axios';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const baseUrl = 'https://localhost:8080';

const body = {
    padding: '0.5rem calc((100vw - 165vh) / 3)',
};
const buttonRow = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '3vh',
    color: 'black',
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

const doc = new jsPDF();


const UserCalendar = () => {
    const [firstCalendarArray, setFirstCalendarArray] = useState([]);
    const [secondCalendarArray, setSecondCalendarArray] = useState([]);
    const [thirdCalendarArray, setThirdCalendarArray] = useState([])


    useEffect(() => {
        fetchCalendar();
    }, []);

    async function fetchCalendar() {
        await axios.get(baseUrl + '/ObtenerC')
            .then(response => {
                var calendarArray = response.data;
                setFirstCalendarArray(getQuarterArray(calendarArray, 1));
                setSecondCalendarArray(getQuarterArray(calendarArray, 2));
                setThirdCalendarArray(getQuarterArray(calendarArray, 3))
                //console.log("CALENDARARRAY--"+data)            
            });

        /*var calendarArray = ([]);
        setFirstCalendarArray(getQuarterArray(calendarArray, 1));
        setSecondCalendarArray(getQuarterArray(calendarArray, 2))
        setThirdCalendarArray(getQuarterArray(calendarArray, 3))
        console.log("FETCHCALENDAR")*/
    }



    const calendarComponent = (title, calendarArray, enable) => {
        return (<div> <br />
            <h2> {title} </h2>
            <br />
            <CalendarTable calendarArray={calendarArray} editable={enable} fetchCalendar={fetchCalendar} enableHeader={enable} />
            <br />
        </div>);
    };

    const CalendarRender = () => (<div id="Calendar">
        {firstCalendarArray.length > 0 ? calendarComponent("Primer semestre", firstCalendarArray, true) : null}
        {secondCalendarArray.length > 0 ? calendarComponent("Segundo semestre", secondCalendarArray, true) : null}
        {thirdCalendarArray.length > 0 ? calendarComponent("Período exámenes 2ª Convocatoria", thirdCalendarArray, false) : null}
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

    return (
        <div style={body}>
            <div style={buttonRow}>
                <button onClick={savePdf} style={gen}>Exportar a PDF</button>
                {/*<button onClick={saveICS} style={gen}>Exportar a iCalendar</button>*/}
            </div>
            <CalendarRender />
        </div>
    );
};

export default UserCalendar;