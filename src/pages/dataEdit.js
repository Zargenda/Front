import React from 'react'
import { useState, useEffect } from "react";
import { Col, Container} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import MaterialTable from 'material-table';


import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import Delete from '@material-ui/icons/Delete'
import Clear from '@material-ui/icons/Clear'
import Edit from '@material-ui/icons/Edit'


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

const DataEdit = () => {    
    const data = [ {codigo: '0001', nombre: 'Matemáticas'}, {codigo: '0002', nombre: 'AOC2'} ];
    const columns = [{title: 'Código', field: 'codigo'}, {title: 'Asignatura', field: 'nombre'}];

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
                        <h1>Edición de datos</h1>
                    </div>
                    
                    <MaterialTable
                        columns={columns}
                        data={data}
                        title="Asignaturas"
                        actions={[
                            { icon: Edit, tooltip: 'Editar', onClick: (event, rowData)=> alert('Estas editando')},
                            { icon: Delete, tooltip: 'Eliminar', onClick: (event, rowData)=> window.confirm('Estas eliminando?')}
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                        localization={{
                            header:{
                                actions: 'Acciones'
                            }
                        }}
                        icons={{ 
                            Check: Check,
                            DetailPanel: ChevronRight,
                            Export: SaveAlt,
                            Filter: FilterList,
                            FirstPage: FirstPage,
                            LastPage: LastPage,
                            NextPage: ChevronRight,
                            PreviousPage: ChevronLeft,
                            Search: Search,
                            ThirdStateCheck: Remove,
                            Edit: Edit,
                            Clear: Clear
                          }}
                        />
                </Col>
            </Container>
        </div>
    )
}

export default DataEdit
