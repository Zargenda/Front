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
import {Session, SessionRole, SessionEmail} from './pages/session';
import UserCalendar from './pages/userCalendar';
import Incompatibilities from './pages/incompatibilities';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionEmail, setSessionEmail] = useState("");
  const [sessionRole, setSessionRole] = useState("");
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Session.Provider value={{sessionActive, setSessionActive}}>
      <SessionEmail.Provider value={{sessionEmail, setSessionEmail}}>
        <SessionRole.Provider value={{sessionRole, setSessionRole}}>
          <Router>
          <Sidebar isOpen={isOpen} toggle={toggle}/>
          <Navbar toggle={toggle}/>
            <Switch>
              <Route path='/' exact={true} component={Home} />
              <Route path='/signup' component={SignUp} />
              <Route path='/admin' component={AdminMenu} />
              <Route path='/createCalendar' component={CreateCalendar}/>
              <Route path='/dataLoad' component={DataLoad} />
              <Route path='/createSchedule' component={CreateSchedule} />
              <Route path='/dataEdit' component={DataEdit} />
              <Route path='/editSchedule' component={EditSchedule} />
              <Route path='/user' component={UserMenu} />
              <Route path='/userCalendar' component={UserCalendar} />
              <Route path='/incompatibilities' component={Incompatibilities} />
            </Switch>
          </Router>
        </SessionRole.Provider>
      </SessionEmail.Provider>
    </Session.Provider>
  );
}

export default App;
