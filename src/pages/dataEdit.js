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
      border: '2px solid graylight',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
        transform: 'translate(-50%, -50%)',


        borderStyle: 'outset',
        borderRadius: '6px',
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

const baseUrl='https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES'

const DataEdit = () => {   
    const styles = useStyles(); 
    const [data, setData] = useState([]);
    const columns = [{title: 'Código', field: 'Cod_IOE'}, {title: 'Asignatura', field: 'Nombre'}];
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [asignaturaSeleccionada, setAsignaturaSeleccionada]=useState({
        Cod_IOE: '',
        Nombre:'',
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

    async function fetchData(){
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data)
            //console.log(data)            
        })
    }

    let isMobile = (width <= 768);

    const handleChange=e=>{
        const {name, value}=e.target;
        setAsignaturaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }))
    }

    const peticionDelete=async()=>{
        //await axios.delete(baseUrl)
        //.then(response=>{
        //  setData(data.filter(asginatura=>asginatura.id!==asginaturaSeleccionada.id));
        //  abrirCerrarModalEliminar();
        //})
        abrirCerrarModalEliminar();
    }

    const peticionPost=async()=>{
        await axios.post(baseUrl)
        .then(response=>{
          //setData(data.concat(response.data))
          abrirCerrarModalInsertar()
        })
    }

    const peticionPut=async()=>{
        /*await axios.put(baseUrl)
        .then(response=>{
          var dataNueva=data;
          dataNueva.map(asignatura=>{
            if(asignaturaSeleccionada.id===asignatura.id){
              asignatura.nombre=asignaturaSeleccionada.nombre;
              asignatura.lanzamiento=asignaturaSeleccionada.codigo;
            }
          })
          setData(dataNueva);
          abrirCerrarModalEditar();
        })
        */
        abrirCerrarModalEditar();
      }

    const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
    }

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
    }

    const bodyInsertar=(
    <div className={styles.modal}>
        <h3>Agregar nueva asignatura</h3>
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
        <br />
        <TextField name="empresa" className={styles.inputMaterial} label="Empresa" onChange={handleChange}/>
        <br />
        <TextField name="lanzamiento" className={styles.inputMaterial} label="Lanzamiento" onChange={handleChange}/>
        <br />
        <TextField name="unidades_vendidas" className={styles.inputMaterial} label="Unidades Vendidas" onChange={handleChange}/>
        <br /><br />
        <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
    </div>
    )

    const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar asignatura</h3>
          <TextField name="Nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={asignaturaSeleccionada && asignaturaSeleccionada.Nombre}/>
          <br />
          <TextField name="Cod_IOE" className={styles.inputMaterial} label="Codigo" onChange={handleChange} value={asignaturaSeleccionada && asignaturaSeleccionada.Cod_IOE}/>
          <br />
          <div align="right">
            <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )

    const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar la asignatura <b></b> ? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
    )

    const seleccionarAsignatura=(asignatura, caso)=>{
        setAsignaturaSeleccionada(asignatura);
        (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
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
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

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
