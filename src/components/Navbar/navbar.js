import React from 'react'
import { FaBars } from 'react-icons/fa';
import {Session, SessionEmail, SessionRole} from '../../pages/session';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    NavBtnLinkRed
  } from './NavBarElements';

const Navbar = ({toggle}) => {
    const {sessionActive, setSessionActive} = React.useContext(Session);
    const {sessionEmail, setSessionEmail} = React.useContext(SessionEmail);
    const {sessionRole, setSessionRole} = React.useContext(SessionRole);
    
    return (
        <>
            <Nav>
                <NavLink to="/">
                    
                </NavLink>
                <Bars onClick={toggle}>
                    <FaBars />
                </Bars>
                {sessionActive ?
                <NavMenu>
                    <NavLink to={sessionRole == "Administrador" ? '/admin' : '/user'} activeStyle>
                        {sessionRole +" "+sessionEmail}
                    </NavLink>
                    <NavBtn>
                    <NavBtnLinkRed onClick={() =>setSessionActive(false)} to="/"> Cerrar sesión</NavBtnLinkRed>
                    </NavBtn> 
                </NavMenu>
                : <NavMenu>
                    <NavLink to='/signup' activeStyle>
                        Registrarse
                    </NavLink>
                    <NavBtn>
                         <NavBtnLink to="/"> Iniciar sesión</NavBtnLink>                        
                    </NavBtn>                    
                </NavMenu>}
                
            </Nav>
        </>
    )
}

export default Navbar;
