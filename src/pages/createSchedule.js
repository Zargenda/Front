import React from 'react';
import { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import 'js-year-calendar/dist/js-year-calendar.css';
import 'js-year-calendar/locales/js-year-calendar.es';
import CalendarTable from '../components/Calendar/calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import TimePicker from 'react-time-picker'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import CustomTimeline from './CustomTimeline'

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

const label3 = {
    marginLeft: '5vh',
    display: 'flex',

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

const body ={
    padding: '0.5rem calc((100vw - 1000px) / 3)',
}

const CreateSchedule = () => {  
    const [careers, setCareers] = useState(["Ing. informática", "Magisterio      ", "Teleco          "]);
    const [grades, setGrades] = useState(["Primero", "Segundo", "Tercero", "Cuarto ", "Quinto ", "Sexto  "]);
    const [groups, setGroups] = useState(["Mañanas", "Tardes " ]);
    const [semesters, setSemesters] = useState(["Primer semestre ", "Segundo semestre"]);
    const [subjects, setSubjects] = useState(["Gestión de proyecto software", "Lab Ing Soft"]);
    const [genres, setGenres] = useState(["Teoría", "Problemas", "Prácticas"]);
    const [locations, setLocations] = useState(["A.1", "A.2", "A.3"]);
    const [days, setDays] = useState(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]);
    const [frecuency, setFrecuency] = useState(["Semanal", "Quincenal"]);
    const [selectedCareer, setSelectedCareer] = useState("Ing informática");
    const [selectedGrade, setSelectedGrade] = useState("Primero");
    const [selectedGroup, setSelectedGroup] = useState("Mañanas");
    const [selectedSemester, setSelectedSemester] = useState("Primer semestre");
    const [selectedSubject, setSelectedSubject] = useState("Gestión de proyecto software");
    const [selectedGenre, setSelectedGenre] = useState("Teoría");
    const [selectedLocation, setSelectedLocation] = useState("A.1");
    const [selectedDay, setSelectedDay] = useState("Lunes");
    const [selectedFrecuency, setSelectedFrecuency] = useState("Semanal");
    const [startClock, setStartClock] = useState('10:00');
    const [endClock, setEndClock] = useState('10:00');


    return(
        <div style={body}>
            <div style={title}>
                <h1>Creación del horario</h1>
            </div>

            <div style={row}>
                <label>Seleccionar plan de estudios</label>
                <label style={label3} >Seleccionar curso</label>
                <label style={label3} >Grupo</label>
                <label style={label3} >Semestre</label>
            </div>

            <div style={row}>
                    <DropdownButton id="dropdown-item-button"  title={selectedCareer}  variant="light">
                    {careers.map((career) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedCareer(career)}>{career}</Dropdown.Item>))}
                    </DropdownButton>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedGrade}  variant="light">
                    {grades.map((grade) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedGrade(grade)}>{grade}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedGroup}  variant="light">
                    {groups.map((group) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedGroup(group)}>{group}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedSemester}  variant="light">
                    {semesters.map((semester) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedSemester(semester)}>{semester}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>
            
            <div style={row}>
                <label>Asignaturas disponibles</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedSubject}  variant="light">
                    {subjects.map((subject) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedSubject(subject)}>{subject}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>

            <div style={row}>
                <label>Tipo</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedGenre}  variant="light">
                    {genres.map((genre) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedGenre(genre)}>{genre}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <label style={label3}>Aula</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedLocation}  variant="light">
                    {locations.map((location) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedLocation(location)}>{location}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>

            <div style={row}>
                <label>Días</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedDay}  variant="light">
                    {days.map((day) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedDay(day)}>{day}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <label style={label3}>Frecuencia</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedFrecuency}  variant="light">
                    {frecuency.map((frecuency) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedFrecuency(frecuency)}>{frecuency}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>

            <div style={row}>
                <label>Hora inicio</label>
                <div style={label3}>
                    <TimePicker
                        onChange={setStartClock}
                        value={startClock}
                    />
                </div>
                <label style={label3}>Hora fin</label>
                <div style={label3}>
                    <TimePicker
                        onChange={setEndClock}
                        value={endClock}
                    />
                </div>
            </div>

            <br/>
            <br/>
            <button style={gen}>Añadir</button>
            <br/>
            <br/>
            <br/>
            <CustomTimeline/>
        </div>

    )
}

export default CreateSchedule