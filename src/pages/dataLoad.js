import React from 'react'
//import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import { useState, useEffect } from "react";
import { Col, Container} from "react-bootstrap";
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import { useHistory } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


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
    width: "1200px",
};

const mobileTable = {
    display: "flex", 
    height: "400px", 
    width: "340px",
    scrollBehaviour: "smooth",
    overflow: "scroll", 
};

const DataLoad = () => {    
    const [initialData, setInitialData] = useState(undefined);
    const [currentSheet, setCurrentSheet] = useState({});
    const history = useHistory();
    const handleUpload = (event) => {
        const file = event.target.files[0];
        //read excel file
        readFile(file)
        .then((readedData) => setInitialData(readedData))
        .catch((error) => console.error(error));
    };

    const save = () => {
        //const result = generateObjects(currentSheet);
        //save array of objects to backend
        //fetch("/api/save", {
        //    method: 'POST',
        //    body: JSON.stringify(result)
        //});
        history.push("/dataEdit");
    };

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

    let isMobile = (width <= 768);
    return (
        <div class="row" style={column}>
            <Container fluid="md">
                <Col>
                    <div style={{justifyContent: "flex-start"}}>
                        <h1>Carga de datos</h1>
                    </div>
                    <input
                        type='file'
                        accept='.xlsx'
                        onChange={handleUpload}
                    />
                    <div style={!isMobile ? table : mobileTable}>
                        <ReactExcel
                            initialData={initialData}
                            onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
                            activeSheetClassName='active-sheet'
                            reactExcelClassName='react-excel'
                        />
                    </div>
                    <div style={!isMobile ? button : { display: "flex", justifyContent: 'center', alignItems: 'center',}}>  
                        <button onClick={save} style={{ backgroundColor: "#685cf4", color: 'whitesmoke', borderRadius: '4px', height: '50px', width: '130px' }}> Importar </button>
                    </div>
                </Col>
            </Container>
        </div>
    )
}

export default DataLoad
