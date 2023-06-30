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
import Panel from '../../../components/elements/Panel'
import ConnectedSchedule from '../../../components/elements/Schedule'
import Container from 'react-bootstrap/Container'

// redux 
import { TOGGLE_HYDRO_SETTINGS, SET_DISABLED, SET_STATUS_LENGTH, SET_PROGRESS, TOGGLE_BORDER_40_WATER_LIFE } from '../../../redux/actions'

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

  const [status, setStatus] = useState<any>([]);
  const [disabled, setDisabled] = useState<any>([]);

  const { 
    HYDRO_SETTINGS, HYDRO_DATA, DATE, DISABLED, STATUS, PROGRESS, LOG_IN_OUT_TYPE, HYDRO_SCHEDULE, HYDRO_INTAKE, REMINDER_NOT_ENOUGH_TIME, BORDER_40_WATER_LIFE,
    TOGGLE_HYDRO_SETTINGS, SET_DISABLED, SET_STATUS, SET_PROGRESS, TOGGLE_BORDER_40_WATER_LIFE
   } = props 

  useEffect( () => {
    const settingsDuringDashboard = localStorage.getItem('settingsDuringDashboard')
    if (settingsDuringDashboard === 'yes') {
      timeoutFunc(TOGGLE_HYDRO_SETTINGS, 1000)
      localStorage.removeItem("settingsDuringDashboard")
    }
  })

  useEffect( () => {
    SET_DISABLED({payload: Array(HYDRO_SCHEDULE.length).fill(false)})
    setStatus(Array(HYDRO_SCHEDULE.length).fill(''))
    // SET_STATUS_LENGTH({payload: Array(HYDRO_SCHEDULE.length).fill(false)})
    // ""
  }, [HYDRO_DATA])


  // handleclick
  const handleClick = async (event:any) => {    

    // if a button is clicked, disable the button
    // const newDisabled = [...DISABLED];
    // newDisabled[index] = true;
    // SET_DISABLED({payload: newDisabled})
    // // setDisabled(newDisabled);

    // const newStatus = [...STATUS];
    // newStatus[index] = 'check';
    // SET_STATUS({payload: newStatus})
    // // SET_STATUS(newStatus);

    // console.log('newStatus')
    // console.log(newStatus)
    // console.log(newStatus.length)

    // const filterProgress = newStatus.filter((e) => e === 'check');
    // console.log('filterProgress')
    // console.log(filterProgress)

    // const calculateProgress = filterProgress.length / newStatus.length;
    // console.log('calculateProgress')
    // console.log(calculateProgress)

      
    // SET_PROGRESS({payload: calculateProgress / HYDRO_SCHEDULE.length})
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


  const testbtn = () => {
    console.log('HYDRO_SCHEDULE')
    console.log(HYDRO_SCHEDULE)

    console.log('HYDRO_INTAKE')
    console.log(HYDRO_INTAKE)

    console.log('STATUS')
    console.log(STATUS)

    console.log('DISABLED')
    console.log(DISABLED)
  }

  const border40homeContEnter = () => {
    TOGGLE_BORDER_40_WATER_LIFE()
  }

  const border40homeContLeave = () => {
    TOGGLE_BORDER_40_WATER_LIFE()
  }


  const renderHome = () => {
    return (
      // <div id="Page_1">
        <>
          <Container className="primary">
          <div className="display">

          </div>
          <Container className="schedule">
            {
              HYDRO_SCHEDULE.length > 1
                    ?
                <>
              <ConnectedSchedule
              hydroSchedule={HYDRO_SCHEDULE}
              hydroIntake={HYDRO_INTAKE}
              // handleClick={handleClick}
              status={status}
              setStatus={setStatus}
              disabled={disabled}
              setDisabled={setDisabled}
              />
              <h4 style={{ display: REMINDER_NOT_ENOUGH_TIME ? "" : "none", color: '#73defe'}}> We must refill within 90 mins of reminder! </h4>
              </>
                    :
                <pre></pre>
            }

          </Container>
        </Container>

      <Container className="panel">        
        {
          HYDRO_SETTINGS
          ?
          <Settings/> 
          :
          // <pre></pre>
          <Panel
            date={DATE}
            hydroIntake={HYDRO_INTAKE}
            hydroSchedule={HYDRO_SCHEDULE}
          />
        }
        </Container>

      </>      
       
    
    // </div>
    
  )
}

return <Container style={{ border: BORDER_40_WATER_LIFE ? "" : "40px dotted #73defe" }} onMouseEnter={border40homeContEnter} onMouseLeave={border40homeContLeave} className="home-container"> {renderHome()} </Container>

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
  HYDRO_INTAKE: state.HYDRO_INTAKE,
  REMINDER_NOT_ENOUGH_TIME: state.REMINDER_NOT_ENOUGH_TIME,  
  BORDER_40_WATER_LIFE: state.BORDER_40_WATER_LIFE
});

const mapDispatchToProps = (dispatch:any) => ({
  TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
  SET_DISABLED: (action:any) => dispatch(SET_DISABLED(action)),
  SET_STATUS_LENGTH: (action:any) => dispatch(SET_STATUS_LENGTH(action)),
  SET_PROGRESS: (action:any) => dispatch(SET_PROGRESS(action)),
  TOGGLE_BORDER_40_WATER_LIFE: () => dispatch(TOGGLE_BORDER_40_WATER_LIFE())
  // TOGGLE_BORDER_40_WATER_LIFE
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeTS);
