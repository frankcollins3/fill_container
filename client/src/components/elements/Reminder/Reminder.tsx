import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import {useImage} from '../../../utility/Contexts/ImgContext'
import './reminder.css';
import $ from 'jquery'

import { SET_PROGRESS, SET_STATUS_INDEX } from '../../../redux/actions'
  
function Reminder(props: any) {

  const [isShown, setIsShown] = useState(false);
  const reminderContJQ = $('#Reminder-Cont')[0]

  const {mouseWaterCup, mouseDroplet, bg} = useImage()

  const { 
    time, amt, amtper, percent, index, status, setStatus, disabled, HYDRO_SCHEDULE, HYDRO_DATA, HYDRO_INTAKE, STATUS, DISABLED,
    SET_PROGRESS, SET_STATUS_INDEX
  } = props

  const transformers = ["rotate(90deg)", "scale(0.25)"].join(" ")

  //  time, amt, amtper, percent, index, status, disabled

  // const { amt, amtper, percent, index, status} = props

  const handleClick = (index:number) => {
    console.log($(`#timeSpan${index}`))

    let indexTargetSpan = $(`#timeSpan${index}`)[0]
    console.log('indexTargetSpan')
    console.log(indexTargetSpan)
    console.log(indexTargetSpan.innerText)

    


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
          // disabled={disabled[index]}
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
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_PROGRESS: (action:any) => dispatch(SET_PROGRESS(action)), 
    SET_STATUS_INDEX: (action:any) => dispatch(SET_STATUS_INDEX(action)), 
})

const ConnectedReminder = connect(mapStateToProps, mapDispatchToProps)(Reminder)
export default ConnectedReminder


// const mapDispatchToProps = (state:any) => {

// }
