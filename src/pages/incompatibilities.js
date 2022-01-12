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

const Incompatibilities = () => {    
    const [incompatibilities, setIncompatibilities] = useState([]);

    useEffect(() => {
        loadIncompatibilities()
        return () => {
        }
    }, []);

    async function loadIncompatibilities(){           
        await axios.get("http://localhost:8080/horarios/getConflictos")
                .then(response => {
                    if(!response.data){
                        console.log("Error fetching data")
                    }else{     
                    console.log("El data es "+JSON.stringify(response.data))
                    var aux = []
                    for(var i = 0; i < response.data.length; i++){
                        aux.push(response.data[i].descripcion)
                    }         
                    setIncompatibilities(aux)
                    }                           
                });    
    }

    return (
        <div class="row" style={column}>
            <Container fluid="md">
                <Col>                    
                    <div style={{justifyContent: "flex-start", marginTop: "40px", marginBottom: "40px"}}>
                        <h1>LISTADO DE INCOMPATIBILIDADES EXISTENTES</h1>
                    </div>          
                    {incompatibilities.map(incompatibility => <label style={{color: "black", display: "flex", marginTop: "20px"}}>{incompatibility}</label>)}          
                </Col>
            </Container>
        </div>
    )
}

export default Incompatibilities
