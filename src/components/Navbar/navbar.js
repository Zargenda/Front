import React from 'react'
import { FaBars } from 'react-icons/fa';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavBarElements';

const Navbar = ({toggle}) => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    
                </NavLink>
                <Bars onClick={toggle}>
                    <FaBars />
                </Bars>
                <NavMenu>
                    <NavLink to='/signup' activeStyle>
                        Registrarse
                    </NavLink>
                    <NavBtn>
                        <NavBtnLink to="/"> Iniciar sesión</NavBtnLink>
                </NavBtn>
                </NavMenu>
                
            </Nav>
        </>
    )
}

export default Navbar;
