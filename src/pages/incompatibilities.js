import React from 'react'
import { useState, useEffect } from "react";
import { Col, Container} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';

const column = {
    display: 'flex',
    marginLeft: '5%',
    alignItems: 'center',
    marginTop: '2%',
    marginRight: '5%',
  };

const button = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const table = {
    display: "flex", 
    height: "50vh", 
    overflow: "scroll", 
    marginLeft: "1%", 
    marginRight: "1%",
    width: "85vw",
};

const mobileTable = {
    display: "flex", 
    height: "400px", 
    width: "340px",
    scrollBehaviour: "smooth",
    overflow: "scroll", 
};

const baseUrl='https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES'

const Incompatibilities = () => {    
    const [schedules, setSchedules] = useState(["Horario semestre otoño","Horario semestre primavera"]);
    const [selectedSchedule, setSelectedSchedule] = useState("Semestre otoño");
    const [incompatibilities, setIncompatibilities] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    async function fetchData(schedule){
        await axios.get(baseUrl)        
        .then(response=>{
            setIncompatibilities(response.data)
            console.log(response.data)            
        })
    }

    async function getIncompatibilities(schedule){
        setSelectedSchedule(schedule)
        fetchData(schedule)
    }

    let isMobile = (width <= 768);
    return (
        <div class="row" style={column}>
            <Container fluid="md">
                <Col>
                    <DropdownButton id="dropdown-item-button"  title={selectedSchedule}  variant="light">
                    {schedules.map((schedule) => (
                        <Dropdown.Item as="button" onClick={() => getIncompatibilities(schedule)}>{schedule}</Dropdown.Item>))}
                    </DropdownButton>
                    
                    <div style={{justifyContent: "flex-start", marginTop: "40px", marginBottom: "40px"}}>
                        <h1>LISTADO DE INCOMPATIBILIDADES EXISTENTES</h1>
                    </div>          
                    {incompatibilities.map(incompatibility => <label style={{color: "black", display: "flex"}}>{incompatibility.Nombre}</label>)}          
                </Col>
            </Container>
        </div>
    )
}

export default Incompatibilities
