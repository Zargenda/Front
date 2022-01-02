import React from 'react';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../images/zargenda.svg';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const row = {
  display: 'flex', 
  flexDirection: 'row', 
  marginTop: '3vh', 
  justifyContent: 'center', 
};
const column = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20vh',
  marginTop: '5vh'
};

const form = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '2vh',
  marginTop: '3vh',
};

const button = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '5vh',
};

const UserMenu = () => {
  const [careers, setCareers] = useState(["Teoría", "Problemas", "Prácticas", "Seminario"]);
  const [grades, setGrades] = useState(["Primero", "Segundo", "Tercero", "Cuarto ", "Quinto ", "Sexto  "]);
  const [semesters, setSemesters] = useState(["Primer semestre ", "Segundo semestre"]);
  const [selectedCareer, setSelectedCareer] = useState("Teoría");
  const [selectedGrade, setSelectedGrade] = useState("Teoría");
  const [selectedSemester, setSelectedSemester] = useState("Teoría");
  const history = useHistory();

  function handleClick(e, page) {
    e.preventDefault();
    history.push(page);
  }

  const [width, setWidth] = useState(window.innerWidth);

  function updateCareer (career) { 
    setSelectedCareer(career)
  }
  function updateGrade (grade) { 
    setSelectedGrade(grade)
  }
  function updateSemester (semester) { 
    setSelectedSemester(semester)
  }

  useEffect(() => {
      
  }, []);

  let isMobile = (width <= 768);
  return (
    <>
    <div style={column}>
      <Logo/>
    </div>
    <div style={button}>  
              <button onClick={(e) => handleClick(e, "/UserCalendar")} style={{ backgroundColor: "#685cf4", color: 'whitesmoke', borderRadius: '4px', height: '40px', width: '300px' }}> Consultar Calendario Académico </button>
    </div>
    <div style={form}>
    </div>
    <div style={row}>
      <label style={{marginLeft: '-150px'}}>Seleccionar plan de estudios: </label>
      <label style={{marginLeft: '150px'}}>Seleccionar curso: </label>
    </div>
    <div style={row}>
      <div>
      <DropdownButton size="lg" style={{marginLeft: '-100px'}} id="dropdown-item-button"  title={selectedCareer}  variant="light">
        {careers.map((career) => (
          <Dropdown.Item as="button" onClick={() => updateCareer(career)}>{career}</Dropdown.Item>))}
      </DropdownButton>
      </div>
      <DropdownButton size="lg" style={{marginLeft: '240px'}} id="dropdown-item-button"  title={selectedGrade}  variant="light">
        {grades.map((grade) => (
          <Dropdown.Item as="button" onClick={() => updateGrade(grade)}>{grade}</Dropdown.Item>))}
      </DropdownButton>
    </div>
    <div style={row}>
      <label style={{marginLeft: '-450px'}}>Seleccionar semestre: </label>
    </div>
    <div style={row}>
      <DropdownButton size="lg" style={{marginLeft: '-100px'}} id="dropdown-item-button"  title={selectedSemester}  variant="light">
        {semesters.map((semester) => (
          <Dropdown.Item as="button" onClick={() => updateSemester(semester)}>{semester}</Dropdown.Item>))}
      </DropdownButton> 
      <button onClick={(e) => handleClick(e, "/editSchedule")} style={{ backgroundColor: "#685cf4", color: 'whitesmoke', borderRadius: '4px', height: '40px', width: '300px', marginLeft: '50px' }}> Consultar Horario </button>
    
    </div>
    </>
          
  );
};

export default UserMenu;