import React from 'react';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../images/zargenda.svg';

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
  const history = useHistory();

  function handleClick(e, page) {
    e.preventDefault();
    history.push(page);
  }
  
  useEffect(() => {
      
  }, []);

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
      <button onClick={(e) => handleClick(e, "/editSchedule")} style={{ backgroundColor: "#685cf4", color: 'whitesmoke', borderRadius: '4px', height: '40px', width: '300px'}}> Consultar Horario </button>
    </div>
    </>          
  );
};

export default UserMenu;