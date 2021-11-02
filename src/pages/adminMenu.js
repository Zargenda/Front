import React from 'react';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';

const row = {
  display: 'flex', 
  flexDirection: 'row', 
  marginTop: '5vh', 
  alignItems: 'center', 
  justifyContent: 'center', 
  color: 'white',  
  borderRadius: '5px'
};

const column = {
  display: 'flex', 
  flexDirection: 'column', 
  marginTop: '5%',
  marginBottom: '5%', 
  alignItems: 'center', 
  marginLeft: '5%',
  marginRight: '5%',
};

const clickableButton = { 
  flex: 1,  
  backgroundColor: "white", 
  color: '#2422BD', 
  borderRadius: '1px', 
  width: '100%', 
  height: '100%', 
  borderColor: 'whitesmoke' 
}
const unclickableButton = { 
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center', 
  backgroundColor: "#2422BD", 
  color: 'white', 
  borderRadius: '4px', 
  width: '50vh', 
  height: '6vh', 
  borderColor: 'blue' 
}

const AdminMenu = () => {
  const history = useHistory();

  function handleClick(e, page) {
    e.preventDefault();
    history.push(page);
  }

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
    <>
    <div style={column}>
    <div style={isMobile ? column : row}> 
      
      <div style={column}>
        <button disabled='true' style={unclickableButton}> Datos </button>
        <button onClick={(e) => handleClick(e, "/dataLoad")} style={clickableButton}> Carga de datos </button>
        <button style={clickableButton}> Edición de datos </button>
      </div>
      <div style={column}>
        <button disabled='true' style={unclickableButton}> Usuarios </button>
        <button style={clickableButton}> Gestión usuarios privilegiados </button>
      </div>
    </div>
    
    <div style={isMobile ? column : row}>
      
      <div style={column}>
        <button disabled='true' style={unclickableButton}> Horarios </button>
        <button style={clickableButton}> Crear horarios </button>
        <button style={clickableButton}> Modificar horarios </button>
        <button style={clickableButton}> Consultar incompatibilidades </button>
      </div>
      <div style={column}>
        <button disabled='true' style={unclickableButton}> Calendarios </button>
        <button style={clickableButton}> Crear calendarios </button>
        <button style={clickableButton}> Exportar calendarios </button>
      </div>
    </div>
    </div>
    </>
          
  );
};

export default AdminMenu;