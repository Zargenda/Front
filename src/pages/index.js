import React from 'react';
import { ReactComponent as Logo } from '../images/zargenda.svg';
import { useState } from "react";

const column = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20vh'
};

const form = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '2vh'
};

const button = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '10vh'
};
const Home = () => {
  var [correo, setEmail] = useState("");
  var [pass, setPass] = useState("");

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
      <input style={{height: '50px', width: '260px'}} type="email" value={correo} onChange={e => setEmail(e.target.value)} />
    </div>
    <div style={form}>
      <label style={{marginLeft: '-160px'}} htmlFor="password">Contraseña: </label>
    </div>
    <div style={button}>
      <input style={{height: '50px', width: '260px'}} type="password" value={pass} onChange={e => setPass(e.target.value)} />
    </div>
    <div style={button}>  
      <button style={{ backgroundColor: "#2422BD", color: 'whitesmoke', borderRadius: '4px', height: '50px', width: '130px' }}> Iniciar sesión </button>
    </div>
    <div style={form}>  
      <a className="meh" href="/signup">
        <br />
        <label >¿No tienes cuenta? Regístrate </label>
      </a>
    </div>
    </form>
    </>
  );
};

export default Home;