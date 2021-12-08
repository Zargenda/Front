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

const EditSchedule = () => {  
    const [careers, setCareers] = useState(["Ing. informática", "Magisterio      ", "Teleco          "]);
    const [grades, setGrades] = useState(["Primero", "Segundo", "Tercero", "Cuarto ", "Quinto ", "Sexto  "]);
    const [groups, setGroups] = useState(["Mañanas", "Tardes " ]);
    const [semesters, setSemesters] = useState(["Primer semestre ", "Segundo semestre"]);
    const [selectedCareer, setSelectedCareer] = useState("Ing informática");
    const [selectedGrade, setSelectedGrade] = useState("Primero");
    const [selectedGroup, setSelectedGroup] = useState("Mañanas");
    const [selectedSemester, setSelectedSemester] = useState("Primer semestre");
    const [errors, setErrors] = useState(["Error de ejemplo 1", "Error de ejemplo 2"]);

    useEffect(() => {
        saveValues()
    }, []);

    async function saveValues(){
        await AsyncStorage.setItem("selectedCareer", selectedCareer)
        await AsyncStorage.setItem("selectedGrade", selectedGrade)
        await AsyncStorage.setItem("selectedGroup", selectedGroup)
        await AsyncStorage.setItem("selectedSemester", selectedSemester)
    }

    return(
        <div style={body}>
            <div style={title}>
                <h1>Moficiación del horario</h1>
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