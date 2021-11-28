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

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
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
      </Switch>
    </Router>
  );
}

export default App;
