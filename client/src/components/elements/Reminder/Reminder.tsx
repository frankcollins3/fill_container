import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import './reminder.css';
import $ from 'jquery'

  
function Reminder(props: any) {

  const [isShown, setIsShown] = useState(false);

  const { time, amt, amtper, percent, index, status, disabled, HYDRO_SCHEDULE, HYDRO_DATA, HYDRO_INTAKE, STATUS, DISABLED } = props

  //  time, amt, amtper, percent, index, status, disabled

  // const { amt, amtper, percent, index, status} = props

  const handleClick = (event:any) => {
    console.log('index')
    console.log(index)

    console.log('well isnt that much easier')
    console.log('HYDRO_INTAKE')
    console.log(HYDRO_INTAKE)

    console.log('HYDRO_SCHEDULE.length')
    console.log(HYDRO_SCHEDULE.length)

    let calc = Math.floor((HYDRO_INTAKE / HYDRO_SCHEDULE.length) * (index + 1) / HYDRO_INTAKE)
    console.log('percent')
    console.log(percent)
    
    // console.log(Math.floor(hydroIntake / hydroSchedule.length) * (index + 1)) / hydroIntake))      
}


  // reminder component
  return (
    <>
      <li key={index}>
        <button
          // disabled={disabled[index]}
          className="btn"
          onClick={handleClick}
          style={{
            backgroundColor: `#98ddfc${percent}`,
            width: `${percent}%`,
          }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <span>
            <span>
              {/* { amtper.toFixed(2)} /{' '} {amt.toFixed(0)} fl oz */}
              {status[index] === 'check' ? '✔DONE!⭐' : amtper.toFixed(2)} /{' '} {amt.toFixed(0)} fl oz
            </span>
          </span>
        </button>
        <div className="timeline-text">
          <span
            className="timeline-display"
            style={{ color:  '#00000030'  }} // style={{ color: `${disabled[index] ? '#00000030' : '#000000'}` }}
          >
            {time <= 12 ? time : time - 12} {time < 12 ? 'am' : 'pm'}
          </span>

          {isShown && <div className="timeline-hover"><img src="/water_img/mouse_droplet.png" /></div>}
        </div>
      </li>
    </>
  );
}


const mapStateToProps = (state:any) => ({
    HYDRO_SCHEDULE: state.HYDRO_SCHEDULE,
    HYDRO_DATA: state.HYDRO_DATA,
    HYDRO_INTAKE: state.HYDRO_INTAKE,
    STATUS: state.STATUS,
    DISABLED: state.DISABLED,
})

const ConnectedReminder = connect(mapStateToProps)(Reminder)
export default ConnectedReminder


// const mapDispatchToProps = (state:any) => {

// }