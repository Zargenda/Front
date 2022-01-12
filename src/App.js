import './App.css';
import Navbar from './components/Navbar/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import SignUp from './pages/signup';
import AdminMenu from './pages/adminMenu';
import DataLoad from './pages/dataLoad';
import Sidebar from './components/Sidebar';
import CreateCalendar from './pages/createCalendar.js';
import { useState } from "react";
import CreateSchedule from './pages/createSchedule';
import DataEdit from './pages/dataEdit';
import EditSchedule from './pages/editSchedule';
import UserMenu from './pages/userMenu';
import {ScheduleData} from './pages/scheduleData';
import UserCalendar from './pages/userCalendar';
import Incompatibilities from './pages/incompatibilities';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionEmail, setSessionEmail] = useState("No seleccionado");
  const [sessionRole, setSessionRole] = useState("No seleccionado");
  const [selectedCareer, setSelectedCareer] = useState("Seleccione carrera");
  const [selectedGrade, setSelectedGrade] = useState("Seleccione curso");
  const [selectedGroup, setSelectedGroup] = useState("Seleccione grupo");
  const [selectedSemester, setSelectedSemester] = useState("Seleccione semestre");
  const [selectedSubject, setSelectedSubject] = useState("Seleccione una");
  const [selectedBuilding, setSelectedBuilding] = useState("Ada Byron");
  const [selectedGenre, setSelectedGenre] = useState("Teoría");
  const [selectedLocation, setSelectedLocation] = useState("Seleccione una");
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [startClock, setStartClock] = useState('10:00');
  const [endClock, setEndClock] = useState('10:00');
  const [selectedFrecuency, setSelectedFrecuency] = useState("Semanal");
  const [scheduleData, setScheduleData] = useState([]);

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const column = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
    marginTop: '5vh'
  };

  return (
        <ScheduleData.Provider value={{ selectedCareer: [selectedCareer, setSelectedCareer], selectedGrade: [selectedGrade, setSelectedGrade]
        , selectedGroup: [selectedGroup, setSelectedGroup], selectedGenre: [selectedGenre, setSelectedGenre]
        , selectedLocation: [selectedLocation, setSelectedLocation], selectedSemester: [selectedSemester, setSelectedSemester]
        , selectedSubject: [selectedSubject, setSelectedSubject], selectedDay: [selectedDay, setSelectedDay]
        , selectedBuilding: [selectedBuilding, setSelectedBuilding], startClock: [startClock, setStartClock], endClock: [endClock, setEndClock]
        , selectedFrecuency: [selectedFrecuency, setSelectedFrecuency], scheduleData: [scheduleData, setScheduleData]
        , sessionActive: [sessionActive, setSessionActive], sessionRole: [sessionRole, setSessionRole]
        , sessionEmail: [sessionEmail, setSessionEmail]}}>
          <Router>
          <Sidebar isOpen={isOpen} toggle={toggle}/>
          <Navbar toggle={toggle}/>
            <Switch>
              <Route path='/' exact={true} component={Home} />
              <Route path='/signup' component={SignUp} />
              {!sessionActive ?<div style={column}>Por favor, inicia sesión</div>:<Route path='/admin' component={AdminMenu} />}
              {!sessionActive ?<div style={column}>Por favor, inicia sesión</div>:<Route path='/createCalendar' component={CreateCalendar}/>}
              {!sessionActive ?<div style={column}>Por favor, inicia sesión</div>:<Route path='/dataLoad' component={DataLoad} />}
              {!sessionActive ?<div style={column}>Por favor, inicia sesión</div>:<Route path='/createSchedule' component={CreateSchedule} />}
              {!sessionActive ?<div style={column}>Por favor, inicia sesión</div>:<Route path='/dataEdit' component={DataEdit} />}
              {!sessionActive ?<div style={column}>Por favor, inicia sesión</div>:<Route path='/editSchedule' component={EditSchedule} />}
              {!sessionActive ?<div style={column}>Por favor, inicia sesión</div>:<Route path='/user' component={UserMenu} />}
              {!sessionActive ?<div style={column}>Por favor, inicia sesión</div>:<Route path='/userCalendar' component={UserCalendar} />}
              {!sessionActive ?<div style={column}>Por favor, inicia sesión</div>:<Route path='/incompatibilities' component={Incompatibilities} />}
            </Switch>
          </Router>
          </ScheduleData.Provider>
  );
}

export default App;
