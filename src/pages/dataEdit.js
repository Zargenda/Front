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
import {makeStyles} from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core';
import axios from 'axios';

const column = {
    display: 'flex',
    marginLeft: '5%',
    alignItems: 'center',
    marginTop: '2%',
    marginRight: '5%',
  };

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '0.4vh solid graylight',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderStyle: 'outset',
      borderRadius: '1vh',
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

const baseUrl= "http://localhost:8080/asignaturas"

const DataEdit = () => {   
    const styles = useStyles(); 
    const [data, setData] = useState([]);
    const columns = [{ title: 'Código', field: 'id' }, { title: 'Asignatura', field: 'nombre' }, { title: 'Curso', field: 'curso' },
    { title: 'Semestre', field: 'semestre' }, { title: 'Grupo', field: 'grupo' }];
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [asignaturaSeleccionada, setAsignaturaSeleccionada]=useState({
        id: '',
        nombre:'',
        curso: '',
        semestre: '',
        grupo: ''
      })
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        fetchData()
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    async function fetchData() {
      await axios.get(baseUrl+"/getAsignaturas")
            .then(response => {
                if (!response.data) {
                    console.log("Error fetching data")
                } else {
                  console.log("El data essss "+JSON.stringify(response.data))
                  setData(response.data)
                }                           
            });
    }

    let isMobile = (width <= 768);

    const handleChange=e=>{
        const {name, value}=e.target;
        setAsignaturaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }))
    }

    const onDeleteData = async(id)=> {
      setModalEliminar(!modalEliminar);
      await axios.post(baseUrl+"/delete?id="+id)
            .then(response => {
                if (!response.data) {
                    console.log("Error fetching data")
                } else {
                  console.log("El data essss "+JSON.stringify(response.data))
                  fetchData()                  
                }                           
            });
    }


    const onEditData = async(id, name, grade, semester, group)=> {
      setModalEditar(!modalEditar);
      await axios.post(baseUrl+"/update?id="+id+"&name="+name+"&grade="+grade+"&semester="+semester+"&group="+group)
            .then(response => {
                if (!response.data) {
                    console.log("Error fetching data")
                } else {
                  console.log("El data essss "+JSON.stringify(response.data))
                  fetchData()                  
                }                           
            });
    }

    const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
    }

    const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
    }

    const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar asignatura</h3>
          <TextField name="id" InputProps={{
            readOnly: true,
          }} className={styles.inputMaterial} label="id" onChange={handleChange} value={asignaturaSeleccionada && asignaturaSeleccionada.id}/>
          <br />
          <TextField name="nombre" className={styles.inputMaterial} label="nombre" onChange={handleChange} value={asignaturaSeleccionada && asignaturaSeleccionada.nombre}/>
          <br />          
          <TextField name="curso" className={styles.inputMaterial} label="curso" onChange={handleChange} value={asignaturaSeleccionada && asignaturaSeleccionada.curso}/>
          <br />
          <TextField name="semestre" className={styles.inputMaterial} label="semestre" onChange={handleChange} value={asignaturaSeleccionada && asignaturaSeleccionada.semestre}/>
          <br />
          <TextField name="grupo" className={styles.inputMaterial} label="grupo" onChange={handleChange} value={asignaturaSeleccionada && asignaturaSeleccionada.grupo}/>
          <br />
          <div align="right">
            <Button color="primary" onClick={()=>onEditData(asignaturaSeleccionada.id, asignaturaSeleccionada.nombre, asignaturaSeleccionada.curso, asignaturaSeleccionada.semestre, asignaturaSeleccionada.grupo)}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )

    const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar la asignatura <b></b> ? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>onDeleteData(asignaturaSeleccionada.id)} >Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>    
          </div>
        </div>
    )

    const seleccionarAsignatura=(asignatura, caso)=>{
        setAsignaturaSeleccionada(asignatura);
        (caso ==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
    }

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
                            { icon: Edit, tooltip: 'Editar', onClick: (event, rowData)=> seleccionarAsignatura(rowData, 'Editar')},
                            { icon: Delete, tooltip: 'Eliminar', onClick: (event, rowData)=>seleccionarAsignatura(rowData, 'Eliminar')}
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

            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>

            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>
        </div>
    )
}

export default DataEdit
