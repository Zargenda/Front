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
import axios from 'axios';

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

const baseUrl = "http://localhost:8080/asignaturas"

const CreateSchedule = () => {  
    const [careers, setCareers] = useState([]);
    const [grades, setGrades] = useState([]);
    const [groups, setGroups] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [buildings, setBuildings] = useState(["Ada Byron", "Torres Quevedo", "Betancourt", "Matemáticas"]);
    const [subjects, setSubjects] = useState([]);
    const [genres, setGenres] = useState(["Teoría", "Problemas", "Prácticas", "Seminario"]);
    const [locations, setLocations] = useState([]);
    const [days, setDays] = useState(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]);
    const [frecuency, setFrecuency] = useState(["Semanal", "Quincenal","Puntual"]);    
    const [errors, setErrors] = useState(["Error de ejemplo 1", "Error de ejemplo 2"]);
    const {selectedCareer, selectedGrade, selectedGroup, selectedSemester, selectedSubject,
        selectedGenre, selectedLocation, selectedDay, startClock, endClock, selectedBuilding, selectedFrecuency} = React.useContext(ScheduleData);
    const [selectedCareerObj, setSelectedCareerObj] = selectedCareer
    const [selectedGradeObj, setSelectedGradeObj] = selectedGrade
    const [selectedGroupObj, setSelectedGroupObj] = selectedGroup
    const [selectedSemesterObj, setSelectedSemesterObj] = selectedSemester
    const [selectedBuildingObj, setSelectedBuildingObj] = selectedBuilding
    const [selectedSubjectObj, setSelectedSubjectObj] = selectedSubject
    const [selectedGenreObj, setSelectedGenreObj] = selectedGenre
    const [selectedLocationObj, setSelectedLocationObj] = selectedLocation
    const [selectedDayObj, setSelectedDayObj] = selectedDay
    const [startClockObj, setStartClockObj] = startClock
    const [endClockObj, setEndClockObj] = endClock
    const [selectedFrecuencyObj, setSelectedFrecuencyObj] = selectedFrecuency
    useEffect(() => {        
        fetchCareers()
    }, []);

    async function fetchCareers() {
        await axios.get(baseUrl+"/getAreas")
            .then(response => {
                if(!response.data){
                    console.log("Error fetching data")
                }else{
                    setCareers(response.data)
                }                           
            });
    }

    async function onCareerSelected(career){        
        setSelectedCareerObj(career)
        await axios.get(baseUrl+"/getSemestres?nombrePlan="+career)
            .then(response => {
                if(!response.data){
                    console.log("Error fetching data")
                }else{                  
                    setSemesters(response.data.Semester)
                    setGrades(response.data.Grade)
                }                           
            });
    }
    async function onGradeOrSemesterSelected(grade, semester){        
        setSelectedGradeObj(grade)
        setSelectedSemesterObj(semester)
        await axios.get(baseUrl+"/getGroupsAndSubjects?nombrePlan="+selectedCareerObj+"&semestre="+semester+"&curso="+grade)
            .then(response => {
                if(!response.data){
                    console.log("Error fetching data")
                }else{              
                    var largest = Math.max.apply(0, response.data.groups);
                    var dataInt = parseInt(largest)  
                    var arrayAux = []
                    for(var i = 1; i <= dataInt; i++){
                        arrayAux.push(i)
                    }
                    setGroups(arrayAux)
                    setSubjects(response.data.subjects)
                }                           
            });
    }

    async function onBuildingSelected(building){        
        setSelectedBuildingObj(building)
        var buildingId = 0
        switch(building){
            case "Ada Byron":
                buildingId = 1
                break
            case "Torres Quevedo":
                buildingId = 2
                break
            case "Betancourt":
                buildingId = 3
                break
            case "Matemáticas":
                buildingId = 4
                break
        }

        await axios.get("http://localhost:8080/aulas/getAulas?edificio="+buildingId)
            .then(response => {
                if(!response.data){
                    console.log("Error fetching data")
                }else{              
                    setLocations(response.data)
                }                           
            });
    }

    const updateStartClock = async (clock) => { 
        setStartClockObj(clock)
    }
    const updateEndClock = async (clock) => { 
        setEndClockObj(clock)
    }
    const updateFrecuency = async (frecuency) => { 
        setSelectedFrecuencyObj(frecuency)
    }

    return(
        <div style={body}>
            <div style={title}>
                <h1>Creación del horario</h1>
            </div>
            <div style={row}>
                
                    <DropdownButton id="dropdown-item-button" title={selectedCareerObj}  variant="light">
                    {careers.map((career) => (
                        <Dropdown.Item as="button" onClick={() => onCareerSelected(career)}>{career}</Dropdown.Item>))}
                    </DropdownButton>
                <div style={label3}>
                    <label style={{marginTop: '1vh', marginRight: '1vh'}}>Curso:</label>
                    <DropdownButton id="dropdown-item-button"  title={selectedGradeObj}  variant="light">
                    {grades.map((grade) => (
                        <Dropdown.Item as="button" onClick={() => onGradeOrSemesterSelected(grade, selectedSemesterObj)}>{grade}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <div style={label3}>
                    <label style={{marginTop: '1vh', marginRight: '1vh'}}>Semestre:</label>
                    <DropdownButton id="dropdown-item-button"  title={selectedSemesterObj}  variant="light">
                    {semesters.map((semester) => (
                        <Dropdown.Item as="button" onClick={() => onGradeOrSemesterSelected(selectedGradeObj, semester)}>{semester}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <div style={label3}>
                    <label style={{marginTop: '1vh', marginRight: '1vh'}}>Grupo:</label>
                    <DropdownButton id="dropdown-item-button"  title={selectedGroupObj}  variant="light">
                    {groups.map((group) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedGroupObj(group)}>{group}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                
            </div>
            
            <div style={row}>                
                <div style={label3}>
                    <label style={{marginTop: '1vh',marginRight: '2vh'}}>Asignaturas disponibles</label>
                    <DropdownButton id="dropdown-item-button"  title={selectedSubjectObj}  variant="light">
                    {subjects.map((subject) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedSubjectObj(subject)}>{subject}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>

            <div style={row}>                
                <div style={label3}>
                    <label style={{marginTop: '1vh',marginRight: '2vh'}}>Tipo:</label>
                    <DropdownButton id="dropdown-item-button"  title={selectedGenreObj}  variant="light">
                    {genres.map((genre) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedGenreObj(genre)}>{genre}</Dropdown.Item>))}
                    </DropdownButton>
                </div>                
                <div style={label3}>
                    <label style={{marginTop: '1vh', marginRight: '2vh'}}>Edificio:</label>
                    <DropdownButton id="dropdown-item-button"  title={selectedBuildingObj}  variant="light">
                    {buildings.map((building) => (
                        <Dropdown.Item as="button" onClick={() => onBuildingSelected(building)}>{building}</Dropdown.Item>))}
                    </DropdownButton>
                </div>                
                <div style={label3}>
                    <label style={{marginTop: '1vh', marginRight: '2vh'}}>Aula:</label>
                    <DropdownButton id="dropdown-item-button"  title={selectedLocationObj}  variant="light">
                    {locations.map((location) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedLocationObj(location)}>{location}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
            </div>

            <div style={row}>                
                <div style={label3}>
                    <label style={{marginTop: '1vh', marginRight: '2vh'}}>Días:</label>
                    <DropdownButton id="dropdown-item-button"  title={selectedDayObj}  variant="light">
                    {days.map((day) => (
                        <Dropdown.Item as="button" onClick={() => setSelectedDayObj(day)}>{day}</Dropdown.Item>))}
                    </DropdownButton>
                </div>                
                <div style={label3}>
                    <label style={{marginTop: '1vh', marginRight: '2vh'}} >Frecuencia:</label>
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