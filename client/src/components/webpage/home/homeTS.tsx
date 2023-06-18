import React from "react";
import "./home.css"
import {useState, useEffect} from 'react'
import store from "../../../redux/store"
// import allDBurl from '../../../utility/fetch/allDBurl'
import objResJson from '../../../utility/objResJson'
import timeoutFunc from '../../../utility/timeoutFunc'
import { connect } from 'react-redux'
import $ from 'jquery'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// * components from src/components ---?
import Display from '../../../components/elements/Display'
import Settings from '../../../components/elements/Settings'
import Schedule from '../../../components/elements/Schedule'

// redux 
import { TOGGLE_HYDRO_SETTINGS } from '../../../redux/actions'

const GraphQLcheck = () => {
  console.log('lemme see');
}

let myname:string = "me";
let url:string; // 

interface Props {
  TOGGLE_HYDRO_SETTINGS: false,
  HYDRO_SETTINGS: false,
  HYDRO_DATA: any,
  LOG_IN_OUT_TYPE: string,
  HYDRO_SCHEDULE: number[],
  HYDRO_INTAKE: number,
}

 function HomeTS (props:any) {  

  const { 
    HYDRO_SETTINGS, HYDRO_DATA, DATE, STATUS, PROGRESS, LOG_IN_OUT_TYPE, HYDRO_SCHEDULE, HYDRO_INTAKE, 
    TOGGLE_HYDRO_SETTINGS, 
   } = props 

  useEffect( () => {
    const settingsDuringDashboard = localStorage.getItem('settingsDuringDashboard')
    console.log('settingsDuringDashboard in the Home.tsx')
    console.log(settingsDuringDashboard)
    if (settingsDuringDashboard === 'yes') {
      timeoutFunc(TOGGLE_HYDRO_SETTINGS, 1000)
      localStorage.removeItem("settingsDuringDashboard")
    }

  })

  
  useEffect( () => {
    url = window.location.href
  })

  const test2 = async () => {
    
  }

  useEffect( () => {
    (async() => {
    })()
  }, [])


  const renderHome = () => {
    return (
      // <div id="Page_1">
        <>
          <div className="primary">
          <div className="display">
          {
            PROGRESS > .01 
                  ?
            <Display progress={PROGRESS}/>
                  :
              <pre></pre>
          }
          </div>
          <div className="schedule">
          <Schedule
        hydroSchedule={HYDRO_SCHEDULE}
        hydroIntake={HYDRO_INTAKE}
        // handleClick={handleClick}
        status={STATUS}
        // disabled={disabled}
        />
          </div>
        </div>

      <div className="panel">        
        {
          HYDRO_SETTINGS
          ?
          <Settings/> 
          :
          <pre></pre>
        }
        </div>

      </>      
       
    
    // </div>
    
  )
}

return <div className="home-container"> {renderHome()} </div>

}

const mapStateToProps = (state:any) => ({
  HYDRO_SETTINGS: state.HYDRO_SETTINGS,
  HYDRO_DATA: state.HYDRO_DATA,
  DATE: state.DATE,
  PROGRESS: state.PROGRESS,
  STATUS: state.STATUS,
  LOG_IN_OUT_TYPE: state.LOG_IN_OUT_TYPE,
  HYDRO_SCHEDULE: state.HYDRO_SCHEDULE,
  HYDRO_INTAKE: state.HYDRO_INTAKE
});

const mapDispatchToProps = (dispatch:any) => ({
  TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS())
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeTS);
