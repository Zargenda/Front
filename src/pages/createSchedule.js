import React from 'react';
import { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import 'js-year-calendar/dist/js-year-calendar.css';
import 'js-year-calendar/locales/js-year-calendar.es';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import TimePicker from 'react-time-picker'
import 'react-calendar-timeline/lib/Timeline.css'
import CustomTimeline from './CustomTimeline'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScheduleData} from './scheduleData';

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

const body ={
    padding: '0.5rem calc((100vw - 165vh) / 3)',
}

const CreateSchedule = () => {  
    const [careers, setCareers] = useState(["Ing. informática", "Magisterio      ", "Teleco          "]);
    const [grades, setGrades] = useState(["Primero", "Segundo", "Tercero", "Cuarto ", "Quinto ", "Sexto  "]);
    const [groups, setGroups] = useState(["Mañanas", "Tardes " ]);
    const [semesters, setSemesters] = useState(["Primer semestre ", "Segundo semestre"]);
    const [subjects, setSubjects] = useState(["Gestión de proyecto software", "Lab Ing Soft"]);
    const [genres, setGenres] = useState(["Teoría", "Problemas", "Prácticas", "Seminario"]);
    const [locations, setLocations] = useState(["A.1", "A.2", "A.3"]);
    const [days, setDays] = useState(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]);
    const [frecuency, setFrecuency] = useState(["Semanal", "Quincenal","Puntual"]);    
    const [selectedFrecuency, setSelectedFrecuency] = useState("Semanal");    
    const [errors, setErrors] = useState(["Error de ejemplo 1", "Error de ejemplo 2"]);
    const {selectedCareer, selectedGrade, selectedGroup, selectedSemester, selectedSubject,
        selectedGenre, selectedLocation, selectedDay, startClock, endClock} = React.useContext(ScheduleData);
    const [selectedCareerObj, setSelectedCareerObj] = selectedCareer
    const [selectedGradeObj, setSelectedGradeObj] = selectedGrade
    const [selectedGroupObj, setSelectedGroupObj] = selectedGroup
    const [selectedSemesterObj, setSelectedSemesterObj] = selectedSemester
    const [selectedSubjectObj, setSelectedSubjectObj] = selectedSubject
    const [selectedGenreObj, setSelectedGenreObj] = selectedGenre
    const [selectedLocationObj, setSelectedLocationObj] = selectedLocation
    const [selectedDayObj, setSelectedDayObj] = selectedDay
    const [startClockObj, setStartClockObj] = startClock
    const [endClockObj, setEndClockObj] = endClock
    useEffect(() => {
        //saveValues()
        
    }, []);

    async function saveValues(){
        setSelectedCareerObj(selectedCareerObj)
        setSelectedCareerObj(selectedCareerObj)
        setSelectedCareerObj(selectedCareerObj)
        setSelectedCareerObj(selectedCareerObj)
        setSelectedCareerObj(selectedCareerObj)
    }

    const updateStartClock = async (clock) => { 
        setStartClockObj(clock)
    }
    const updateEndClock = async (clock) => { 
        setEndClockObj(clock)
    }
    const updateFrecuency = async (frecuency) => { 
        setSelectedFrecuency(frecuency)
        await AsyncStorage.setItem("selectedFrecuency", frecuency)
    }

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
                    <DropdownButton id="dropdown-item-button"  title={selectedCareerObj}  variant="light">
                    {careers.map((career) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedCareerObj(career)}>{career}</Dropdown.Item>))}
                    </DropdownButton>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedGradeObj}  variant="light">
                    {grades.map((grade) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedGradeObj(grade)}>{grade}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedGroupObj}  variant="light">
                    {groups.map((group) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedGroupObj(group)}>{group}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedSemesterObj}  variant="light">
                    {semesters.map((semester) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedSemesterObj(semester)}>{semester}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>
            
            <div style={row}>
                <label>Asignaturas disponibles</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedSubjectObj}  variant="light">
                    {subjects.map((subject) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedSubjectObj(subject)}>{subject}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>

            <div style={row}>
                <label>Tipo</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedGenreObj}  variant="light">
                    {genres.map((genre) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedGenreObj(genre)}>{genre}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <label style={label3}>Aula</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedLocationObj}  variant="light">
                    {locations.map((location) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedLocationObj(location)}>{location}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>

            <div style={row}>
                <label>Días</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedDayObj}  variant="light">
                    {days.map((day) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedDayObj(day)}>{day}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <label style={label3}>Frecuencia</label>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedFrecuency}  variant="light">
                    {frecuency.map((frecuency) => (
                        <Dropdown.Item as="button" onClick={() => updateFrecuency(frecuency)}>{frecuency}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>

            <div style={row}>
                <label>Hora inicio</label>
                <div style={label3}>
                    <TimePicker
                        onChange={updateStartClock}
                        value={startClock}
                    />
                </div>
                <label style={label3}>Hora fin</label>
                <div style={label3}>
                    <TimePicker
                        onChange={updateEndClock}
                        value={endClock}
                    />
                </div>
            </div>

            <br/>
            <br/>
            
            <CustomTimeline/>
            <div>
                <label style={{marginTop: "20px", display: "flex", justifyContent: 'center', alignItems: 'center'}}>Listado de incompatibilidades pendientes</label>
                {errors.map(error => <label style={{color: "red", display: "flex", justifyContent: 'center', alignItems: 'center'}}>{error}</label>) }
            </div>
        </div>

    )
}

export default CreateSchedule