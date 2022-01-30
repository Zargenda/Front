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

const baseUrl = 'http://localhost:8080';

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
            });
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
                    let imgWidth = 200;
                    let imgHeight = 340;
                    const year = getStartYear();
                    const imgData = canvas.toDataURL('img/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    pdf.addImage(imgData, 'PNG', imgWidth * 0.1, imgHeight * 0.02, imgWidth * 0.8, imgHeight * 0.8);
                    pdf.save("calendario_" + (year - 1) + "_" + year + ".pdf");
                });
        }
    }

    return (
        <div style={body}>
            <div style={buttonRow}>
                <button onClick={savePdf} style={gen}>Exportar a PDF</button>
            </div>
            <CalendarRender />
        </div>
    );
};

export default UserCalendar;