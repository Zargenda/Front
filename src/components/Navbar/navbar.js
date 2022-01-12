import React from 'react'
import { FaBars } from 'react-icons/fa';
import {ScheduleData} from '../../pages/scheduleData';
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
        <>
            <Nav>
                <NavLink to="/">
                    
                </NavLink>
                <Bars onClick={toggle}>
                    <FaBars />
                </Bars>
                {sessionActiveObj ?
                <NavMenu>
                    <NavLink to={sessionRoleObj == "Administrador" ? '/admin' : '/user'} activeStyle>
                        {sessionRoleObj +" "+sessionEmailObj}
                    </NavLink>
                    <NavBtn>
                    <NavBtnLinkRed onClick={() =>logout()} to="/"> Cerrar sesión</NavBtnLinkRed>
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
