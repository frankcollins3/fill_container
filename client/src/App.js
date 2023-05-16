import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import HomeJS from './components/webpage/home'
import HomeTS from './components/webpage/home/homeTS'

import {connect} from "react-redux"

function App() {

  return (

      <Router>

    <Routes>
    <Route path={'/'} element={ < HomeTS /> } />
    </Routes>

  </Router>
  );
}

export default App;
