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
import { TOGGLE_HYDRO_SETTINGS, SET_DISABLED, SET_STATUS, SET_PROGRESS } from '../../../redux/actions'

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
    HYDRO_SETTINGS, HYDRO_DATA, DATE, DISABLED, STATUS, PROGRESS, LOG_IN_OUT_TYPE, HYDRO_SCHEDULE, HYDRO_INTAKE,
    TOGGLE_HYDRO_SETTINGS, SET_DISABLED, SET_STATUS, SET_PROGRESS,
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
    SET_DISABLED({payload: Array(HYDRO_SCHEDULE.length).fill(false)})
    // ""
  }, [HYDRO_DATA])


  // handleclick
  const handleClick = async (index:any) => {
    // if a button is clicked, disable the button
    const newDisabled = [...DISABLED];
    newDisabled[index] = true;
    SET_DISABLED({payload: newDisabled})
    // setDisabled(newDisabled);

    const newStatus = [...STATUS];
    newStatus[index] = 'check';
    SET_STATUS({payload: newStatus})
    // SET_STATUS(newStatus);

    console.log('newStatus')
    console.log(newStatus)
    console.log(newStatus.length)

    const filterProgress = newStatus.filter((e) => e === 'check');
    console.log('filterProgress')
    console.log(filterProgress)

    const calculateProgress = filterProgress.length / newStatus.length;
    console.log('calculateProgress')
    console.log(calculateProgress)


    SET_PROGRESS({payload: calculateProgress / HYDRO_SCHEDULE.length})
    // setProgress(calculateProgress);

    // update the progress level in the databse
    // const response = await WAPPRequest('/data/daily', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     progress: calculateProgress,
    //     status: newStatus,
    //   }),
    // });
  };





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
        handleClick={handleClick}
        status={STATUS}
        disabled={DISABLED}
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
  DISABLED: state.DISABLED,
  LOG_IN_OUT_TYPE: state.LOG_IN_OUT_TYPE,
  HYDRO_SCHEDULE: state.HYDRO_SCHEDULE,
  HYDRO_INTAKE: state.HYDRO_INTAKE
});

const mapDispatchToProps = (dispatch:any) => ({
  TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
  SET_DISABLED: (action:any) => dispatch(SET_DISABLED(action)),
  SET_STATUS: (action:any) => dispatch(SET_STATUS(action)),
  SET_PROGRESS: (action:any) => dispatch(SET_PROGRESS(action))
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeTS);
