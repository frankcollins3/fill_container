import React from 'react';
import ConnectedReminder from '../../../components/elements/Reminder';
import {connect, useDispatch} from 'react-redux'
import './schedule.css';



 function Schedule(props:any) {
  // hydroSchedule, hydroIntake, handleClick, status, disabled

  const { hydroSchedule, hydroIntake, status, disabled } = props

  // const handleClick = (event:any, index:number) => {
  //     console.log('index')
  //     console.log(index)

  //     console.log('well isnt that much easier')
  //     let calc = Math.floor((hydroIntake / hydroSchedule.length) * (index + 1) / hydroIntake)
  //     console.log('calc')
  //     console.log(calc)
  //     // console.log(Math.floor(hydroIntake / hydroSchedule.length) * (index + 1)) / hydroIntake))      
  // }

  const renderSchedule = () => {
    return hydroSchedule.map((time:any, index:number) => (
      <ConnectedReminder
        key={index}
        time={time}
        amt={(hydroIntake / hydroSchedule.length) * (index + 1)}
        amtper={hydroIntake / hydroSchedule.length}
        percent={Math.floor(
          (((hydroIntake / hydroSchedule.length) * (index + 1)) / hydroIntake) *
            100 -
            1
        )}
        index={index}
        // handleClick={handleClick}
        status={status}
        disabled={disabled}
      />
    ));
  };

  return (
    <div className="schedule-container">
      <ul>{renderSchedule()}</ul>
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

// const mapDispatchToProps = (dispatch:any) => ({

// })

const ConnectedSchedule = connect(mapStateToProps)(Schedule)
export default ConnectedSchedule