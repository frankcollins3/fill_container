import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import {useImage} from '../../../utility/Contexts/ImgContext'
import {useRegex} from '../../../utility/Contexts/RegexMenu'
import './reminder.css';
import $ from 'jquery'

import { SET_PROGRESS, SET_STATUS_INDEX, INCREMENT_REMINDER_CLICK } from '../../../redux/actions'
  
function Reminder(props: any) {

  const [isShown, setIsShown] = useState(false);
  const reminderContJQ = $('#Reminder-Cont')[0]

  const {mouseWaterCup, mouseDroplet, bg} = useImage()
  const { MbetweenYearAndTimeZone, MreturnAlphaChar, McharBeforeFirstColon, RreturnNumbers, RcolonSandwichInt } = useRegex()

  const { 
    time, amt, amtper, percent, index, status, setStatus, disabled, setDisabled, HYDRO_SCHEDULE, HYDRO_DATA, HYDRO_INTAKE, STATUS, DISABLED, REMINDER_CLICK_COUNT,
    SET_PROGRESS, SET_STATUS_INDEX, INCREMENT_REMINDER_CLICK
  } = props

  const transformers = ["rotate(90deg)", "scale(0.25)"].join(" ")

  //  time, amt, amtper, percent, index, status, disabled

  // const { amt, amtper, percent, index, status} = props

  const handleClick = (index:number) => {
    INCREMENT_REMINDER_CLICK()
    const newDisabled = [...disabled];
    newDisabled[index] = true;
    setDisabled(newDisabled);
//  gets the "8 am | 10 am | 12 am" times from Reminder-Bars on Home.tsx. current user && HYDRO_SCHEDULE.length > 1 ?  Compare that time with new Date() time.now() to evaluate successful water intake filling
    console.log($(`#timeSpan${index}`))
    let indexTargetSpan = $(`#timeSpan${index}`)[0]  
    let elemindex = $(`#timeSpan${index}`)
    let todaydate = new Date()
    let timeRightNow:any|null = todaydate.toString().match(MbetweenYearAndTimeZone)
    let currentTime = timeRightNow[1]
    let elemText = indexTargetSpan.innerHTML
    let elemNums:any;
    const checkNumberPromise = new Promise( (resolve:any, reject:any) => {
      let textTimeZone:any = elemText.match(MreturnAlphaChar)      
      elemNums = elemText.slice(0, 2)
      resolve(textTimeZone[0] ? textTimeZone[0] : "notimezone")      
    })
    checkNumberPromise
    .then( (timezone) => {
      let currentTimeHours = currentTime.match(McharBeforeFirstColon)
      let currentTimeMinutes = currentTime.replace(RcolonSandwichInt, '')
      let currentHours = currentTimeHours[0]
      if (timezone === 'pm' && time > 12) {
        console.log("in the conditon")
        const newStatus = [...status];        
        if (time > currentHours) {
          newStatus[index] = 'check';
          setStatus(newStatus);
        } else {          
          newStatus[index] = 'false';
          setStatus(newStatus);
        }
      } else {
        if (time > currentHours) {
          newStatus[index] = 'check';
          setStatus(newStatus);
        } else {          
          newStatus[index] = 'false';
          setStatus(newStatus);
        }
      }
    })
    
    console.log('REMINDER_CLICK_COUNT')
    console.log(REMINDER_CLICK_COUNT)

    if (REMINDER_CLICK_COUNT === HYDRO_SCHEDULE.length) {
      console.log('hi guys how are you')
    }


      





    




    const newStatus = [...status];
    newStatus[index] = 'check';
    setStatus(newStatus);

    // SET_STATUS( {payload: STATUS[index] === 'check'})
    let calc = Math.ceil((HYDRO_INTAKE / HYDRO_SCHEDULE.length) * (index + 1) / HYDRO_INTAKE)
    SET_PROGRESS( {payload: percent / 100 } )
    // SET_PROGRESS( {payload: 100 / HYDRO_SCHEDULE.length / 100 } )
    console.log('percent')
    console.log(percent)    
    // console.log(Math.floor(hydroIntake / hydroSchedule.length) * (index + 1)) / hydroIntake))      
}


  // reminder component
  return (
    <div id="Reminder-Cont">

      <li key={index}>
        <button
          disabled={disabled[index]}
          className="btn"
          onClick={() => handleClick(index)}
          // onClick={handleClick}
          style={{
            backgroundColor: status[index] === '' ? `#98ddfc${percent}` : status[index] === 'check' ? `#98ddfc${percent}` : '#dedede70',
            width: `${percent}%`,
            border: isShown ? "1px dashed #73defe" : "none"
            // width: `${percent}%`,
          }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          >
          <span>
            <span>
              {status[index] === 'check' ? '' : amtper.toFixed(2)} /{' '} {amt.toFixed(0)} fl oz
              { status[index] === '' ?  <pre></pre> : status[index] === "check" ? <img style={{ transform: transformers }} src={mouseDroplet}/> : <img style={{ transform: transformers }} src={bg}/>}
              {/* { status[index] === 'check' ? <img style={{ transform: transformers }} src={mouseDroplet}/> : <pre></pre>} */}
              {/* {status[index] === 'check' ? '✔DONE!⭐' : amtper.toFixed(2)} /{' '} {amt.toFixed(0)} fl oz */}
            </span>
          </span>
        </button>
        <div className="timeline-text">
          <span
            id={`timeSpan${index}`}
            className="timeline-display"
            style={{ color:  '#00000030'  }} // style={{ color: `${disabled[index] ? '#00000030' : '#000000'}` }}
            >
            {time <= 12 ? time : time - 12} {time < 12 ? 'am' : 'pm'}
          </span>

          {/* {isShown && <div className="timeline-hover"><img src="/water_img/mouse_droplet.png" /></div>} */}
        </div>
      </li>
      </div>    
  );
}


const mapStateToProps = (state:any) => ({
    HYDRO_SCHEDULE: state.HYDRO_SCHEDULE,
    HYDRO_DATA: state.HYDRO_DATA,
    HYDRO_INTAKE: state.HYDRO_INTAKE,
    STATUS: state.STATUS,
    DISABLED: state.DISABLED,
    REMINDER_CLICK_COUNT: state.REMINDER_CLICK_COUNT
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_PROGRESS: (action:any) => dispatch(SET_PROGRESS(action)), 
    SET_STATUS_INDEX: (action:any) => dispatch(SET_STATUS_INDEX(action)), 
    INCREMENT_REMINDER_CLICK: () => dispatch(INCREMENT_REMINDER_CLICK()), 
})

const ConnectedReminder = connect(mapStateToProps, mapDispatchToProps)(Reminder)
export default ConnectedReminder


// const mapDispatchToProps = (state:any) => {

// }
