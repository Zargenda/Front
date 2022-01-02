import React from 'react';
import { ReactComponent as Logo } from '../images/zargenda.svg';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Session, SessionRole, SessionEmail} from './session';

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
const Home = () => {
  var [email, setEmail] = useState("");
  var [pass, setPass] = useState("");

  const history = useHistory();
  const {sessionActive, setSessionActive} = React.useContext(Session);
  const {sessionEmail, setSessionEmail} = React.useContext(SessionEmail);
  const {sessionRole, setSessionRole} = React.useContext(SessionRole);

  async function handleClick(e) {
    e.preventDefault();
    /*await axios.get(baseUrl)
      .then(response=>{
        if(!response.data){
          //error
        }else{
          //éxito
          await AsyncStorage.setItem("email", email)
        }
      })*/
    if(email == "user"){
      await AsyncStorage.setItem("email", email)
      setSessionActive(true)
      setSessionEmail(email)
      setSessionRole("Usuario")
      history.push("/user");      
    } else{
      setSessionActive(true)
      setSessionEmail(email)
      setSessionRole("Administrador")
      history.push("/admin");
    }   
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