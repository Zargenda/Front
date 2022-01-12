import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute, SidebarRouteRed } from './SidebarElement'
import {ScheduleData} from '../../pages/scheduleData';

const Sidebar = ({isOpen, toggle}) => {
    const {sessionActive, sessionRole, sessionEmail,
        selectedCareer, selectedGrade, selectedGroup, 
        selectedSemester, selectedSubject} = React.useContext(ScheduleData);
    const [sessionActiveObj, setSessionActiveObj] = sessionActive
    const [sessionEmailObj, setSessionEmailObj] = sessionEmail
    const [sessionRoleObj, setSessionRoleObj] = sessionRole

    const [selectedCareerObj, setSelectedCareerObj] = selectedCareer
    const [selectedGradeObj, setSelectedGradeObj] = selectedGrade
    const [selectedGroupObj, setSelectedGroupObj] = selectedGroup
    const [selectedSemesterObj, setSelectedSemesterObj] = selectedSemester
    const [selectedSubjectObj, setSelectedSubjectObj] = selectedSubject

    async function logout(){
        toggle()
        setSessionActiveObj(false)
        setSessionEmailObj("")
        setSessionRoleObj("")

        setSelectedCareerObj("Seleccione carrera")
        setSelectedGradeObj("Seleccione curso")
        setSelectedGroupObj("Seleccione grupo")
        setSelectedSemesterObj("Seleccione semestre")
        setSelectedSubjectObj("Seleccione una")
    }
    return (
        <SidebarContainer isOpen={isOpen} >
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                {sessionActiveObj ?<SidebarMenu>
                    <SideBtnWrap>
                        <SidebarRouteRed to='' onClick={() =>logout()}>Cerrar sesión</SidebarRouteRed>
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
