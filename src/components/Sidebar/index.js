import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute, SidebarRouteRed } from './SidebarElement'
import {Session} from '../../pages/session';

const Sidebar = ({isOpen, toggle}) => {
    const {sessionActive, setSessionActive} = React.useContext(Session);

    async function handleClick(){
        toggle()
        setSessionActive(false)
    }
    return (
        <SidebarContainer isOpen={isOpen} >
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                {sessionActive ?<SidebarMenu>
                    <SideBtnWrap>
                        <SidebarRouteRed to='' onClick={() =>handleClick()}>Cerrar sesión</SidebarRouteRed>
                    </SideBtnWrap>
                </SidebarMenu>:
                <SidebarMenu>
                <SidebarLink to='signup' onClick={toggle}>Registrarse</SidebarLink>
                <SideBtnWrap>
                    <SidebarRoute to='' onClick={toggle}>Iniciar sesión</SidebarRoute>
                </SideBtnWrap>
            </SidebarMenu>}
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
