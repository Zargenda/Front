import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavBarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    Zargenda
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to='/signup' activeStyle>
                        Sign Up
                    </NavLink>
                    <NavBtn>
                        <NavBtnLink to="/"> Sign in</NavBtnLink>
                </NavBtn>
                </NavMenu>
                
            </Nav>
        </>
    )
}

export default Navbar;
