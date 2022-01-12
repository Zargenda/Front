import React from 'react';
import { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import 'js-year-calendar/dist/js-year-calendar.css';
import 'js-year-calendar/locales/js-year-calendar.es';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
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
    padding: '0.5rem calc((100vw - 1000px) / 3)',
}

const baseUrl = "http://localhost:8080/asignaturas"

const EditSchedule = () => {  
    const [careers, setCareers] = useState([]);
    const [grades, setGrades] = useState([]);
    const [groups, setGroups] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [errors, setErrors] = useState(["Error de ejemplo 1", "Error de ejemplo 2"]);
    const [subjects, setSubjects] = useState([]);
    const {selectedCareer, selectedGrade, selectedGroup, selectedSemester, scheduleData, selectedSubject} = React.useContext(ScheduleData);
    const [selectedCareerObj, setSelectedCareerObj] = selectedCareer
    const [selectedGradeObj, setSelectedGradeObj] = selectedGrade
    const [selectedGroupObj, setSelectedGroupObj] = selectedGroup
    const [selectedSemesterObj, setSelectedSemesterObj] = selectedSemester
    const [selectedSubjectObj, setSelectedSubjectObj] = selectedSubject
    const [scheduleDataObj, setScheduleDataObj] = scheduleData

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
        setScheduleDataObj([])
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
        setScheduleDataObj([])
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

    async function onGroupSelected(group){        
        setSelectedGroupObj(group)
        await axios.get("http://localhost:8080/horarios/getHorario?nombrePlan="+selectedCareerObj+"&semestre="+selectedSemesterObj+"&curso="+selectedGradeObj+"&grupo="+group)
            .then(response => {
                if(!response.data){
                    console.log("Error fetching data")
                }else{              
                    console.log("El data es:" +JSON.stringify(response.data))
                    setScheduleDataObj(response.data)
                }                           
            });
    }

    return(
        <div style={body}>
            <div style={title}>
                <h1>Modificación del horario</h1>
            </div>

            <div style={row}>
                <label>Seleccionar plan de estudios</label>
                <label style={label3} >Seleccionar curso</label>
                <label style={label3} >Semestre</label>
                <label style={label3} >Grupo</label>                
            </div>

            <div style={row}>
                    <DropdownButton id="dropdown-item-button"  title={selectedCareer}  variant="light">
                    {careers.map((career) => (
                        <Dropdown.Item as="button" onClick={() => onCareerSelected(career)}>{career}</Dropdown.Item>))}
                    </DropdownButton>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedGrade}  variant="light">
                    {grades.map((grade) => (
                        <Dropdown.Item as="button" onClick={() => onGradeOrSemesterSelected(grade, selectedSemesterObj)}>{grade}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedSemester}  variant="light">
                    {semesters.map((semester) => (
                        <Dropdown.Item as="button" onClick={() => onGradeOrSemesterSelected(selectedGradeObj, semester)}>{semester}</Dropdown.Item>))}
                    </DropdownButton>
                </div>
                <div style={label3}>
                    <DropdownButton id="dropdown-item-button"  title={selectedGroup}  variant="light">
                    {groups.map((group) => (
                        <Dropdown.Item as="button" onClick={() => onGroupSelected(group)}>{group}</Dropdown.Item>))}
                    </DropdownButton>
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

export default EditSchedule