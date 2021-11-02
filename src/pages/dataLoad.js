import React from 'react'
//import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import { useState } from "react";
import { Col, Container} from "react-bootstrap";
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';

const column = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: '5%',
    alignItems: 'center',
    marginTop: '5%',
    marginRight: '5%',
  };

const button = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh'
};

const DataLoad = () => {    
    const [initialData, setInitialData] = useState(undefined);
    const [currentSheet, setCurrentSheet] = useState({});

    const handleUpload = (event) => {
        const file = event.target.files[0];
        //read excel file
        readFile(file)
        .then((readedData) => setInitialData(readedData))
        .catch((error) => console.error(error));
    };

    const save = () => {
        const result = generateObjects(currentSheet);
        //save array of objects to backend
        fetch("/api/save", {
            method: 'POST',
            body: JSON.stringify(result)
        });
    };

    return (
        <div class="row" style={column}>
            <Container fluid="md">
                <Col>
                    <h1>Carga de datos</h1>
                    <input
                        type='file'
                        accept='.xlsx'
                        onChange={handleUpload}
                    />
                    <div style={{height: "50vh", overflow: "scroll"}}>
                        <ReactExcel
                            initialData={initialData}
                            onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
                            activeSheetClassName='active-sheet'
                            reactExcelClassName='react-excel'
                        />
                    </div>
                    <div style={button}>  
                        <button onClick={save} style={{ backgroundColor: "#2422BD", color: 'whitesmoke', borderRadius: '4px', height: '50px', width: '130px' }}> Importar </button>
                    </div>
                </Col>
            </Container>
            
        </div>
    )
}

export default DataLoad
