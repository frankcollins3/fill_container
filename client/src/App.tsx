import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from "react"
import HomeTS from './components/webpage/home/homeTS'
import {useState, useEffect} from 'react';

import {connect} from "react-redux"

function App() {

  const [hydroData, setHydroData] = useState();
  const [hydroIntake, setHydroIntake] = useState();
  const [hydroSchedule, setHydroSchedule] = useState([]);
  const [hydroSettings, setHydroSettings] = useState();
  const [reload, setReload] = useState();
  const [date, setDate] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  return (

      <Router>

    <Routes>
    <Route path={'/'} element={ < HomeTS /> } />
    </Routes>

  </Router>
  );
}

export default App;
