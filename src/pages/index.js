import React from 'react';
import { ReactComponent as Logo } from '../images/zargenda.svg';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScheduleData} from './scheduleData';
import axios from 'axios';

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
  marginTop: '5vh'
};

const baseUrl= "http://localhost:8080"
const Home = () => {
  var [email, setEmail] = useState("");
  var [pass, setPass] = useState("");
  const {sessionActive, sessionRole, sessionEmail} = React.useContext(ScheduleData);
  const [sessionActiveObj, setSessionActiveObj] = sessionActive
  const [sessionEmailObj, setSessionEmailObj] = sessionEmail
  const [sessionRoleObj, setSessionRoleObj] = sessionRole
  const history = useHistory();
  
  async function handleClick(e) {
    e.preventDefault();
    let loginInfo = {
      email: email,
      pass: pass,
    }
    await axios.post(baseUrl+'/login',{loginInfo})
        .then(response=>{
            if (!response.data) {
                alert("Datos incorrectos.");
            } else {
                if(response.data == 0){
                    alert("Datos incorrectos.");
                }else if(response.data == 1){
                    setSessionActiveObj(true)
                    setSessionEmailObj(email)
                    setSessionRoleObj("Usuario")
                    changeScreen("/user")  
                }else{
                    setSessionActiveObj(true)
                    setSessionEmailObj(email)
                    setSessionRoleObj("Administrador")            
                    changeScreen("/admin")  
                }
            }
        })
  }

  async function changeScreen(screen){
    history.push(screen);
  }

  return (
    <>
        <form>
        <div style={column}>
          <Logo/>
        </div>
        <div style={form}>
          <label style={{marginLeft: '-200px'}}>Correo: </label>
        </div>
        <div style={button}>
          <input style={{height: '50px', width: '260px', marginLeft: '5px'}} type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div style={form}>
          <label style={{marginLeft: '-160px'}} htmlFor="password">Contraseña: </label>
        </div>
        <div style={button}>
          <input style={{height: '50px', width: '260px', marginLeft: '5px'}} type="password" value={pass} onChange={e => setPass(e.target.value)} />
        </div>
        <div style={button}>  
          <button onClick={(e) => handleClick(e)} style={{ backgroundColor: "#685cf4", color: 'whitesmoke', borderRadius: '4px', height: '50px', width: '130px' }}> Iniciar sesión </button>
        </div>
        <div style={form}>  
          <a className="meh" href="/signup">
            <br />
            <label style={{color: "#685cf4"}}>¿No tienes cuenta? Regístrate </label>
          </a>
        </div>
        </form>
    </>
  );
};

export default Home;