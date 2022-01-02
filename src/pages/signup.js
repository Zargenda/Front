import React from 'react';
import { ReactComponent as Logo } from '../images/zargenda.svg';
import { useState } from "react";
import { useHistory } from "react-router-dom";

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

const SignUp = () => {
  var [email, setEmail] = useState("");
  var [pass, setPass] = useState("");
  var [repeatedPass, setRepeatedPass] = useState("")

  const history = useHistory();

  async function handleClick(e) {
    e.preventDefault();
    /*await axios.post(baseUrl)
      .then(response=>{
        if(!response.data){
          //error
        }else{
          //éxito
        }
      })*/
    history.push("/");     
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
    <div style={form}>
      <label style={{marginLeft: '-90px'}} htmlFor="password">Repite la contraseña: </label>
    </div>
    <div style={button}>
      <input style={{height: '50px', width: '260px', marginLeft: '5px'}} type="password" value={repeatedPass} onChange={e => setRepeatedPass(e.target.value)} />
    </div>
    <div style={button}>  
      <button onClick={(e) => handleClick(e)} style={{ backgroundColor: "#685cf4", color: 'whitesmoke', borderRadius: '4px', height: '50px', width: '130px' }}> Registrarse </button>
    </div>
    <div style={form}>  
      <a className="meh" href="/">
        <br />
        <label style={{color: "#685cf4"}}>¿Ya tienes cuenta? Inicia sesión </label>
      </a>
    </div>
    </form>
    </>
  );
};

export default SignUp;