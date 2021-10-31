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
  height: '5vh'
};
const Home = () => {
  var [correo, setEmail] = useState("");
  var [pass, setPass] = useState("");

  return (
    <form>
    <div style={column}>
      <Logo/>
    </div>
    <div style={form}>
      <label >Correo: </label>
    </div>
    <div style={form}>
      <input type="email" value={correo} onChange={e => setEmail(e.target.value)} />
    </div>
    <div style={form}>
      <label htmlFor="password">Contraseña: </label>
    </div>
    <div style={form}>
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} />
    </div>
    <div style={form}>  
      <button style={{ backgroundColor: "#2422BD", color: 'whitesmoke', borderRadius: '4px' }}> Iniciar sesión </button>
    </div>
    <div style={form}>  
      <a className="meh" href="/signup">
        <br />
        <label >¿No tienes cuenta? Regístrate </label>
      </a>
    </div>
    </form>
  );
};

export default Home;