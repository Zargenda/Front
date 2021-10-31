import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './SidebarElement'
import { useHistory } from "react-router-dom";

const Sidebar = ({isOpen, toggle}) => {
    const history = useHistory();

    function handleClick() {
        history.push("/signup");
    }

    return (
        <SidebarContainer isOpen={isOpen} >
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to='signup' onClick={toggle}>Registrarse</SidebarLink>
                    <SideBtnWrap>
                        <SidebarRoute to='' onClick={toggle}>Iniciar sesión</SidebarRoute>
                    </SideBtnWrap>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
