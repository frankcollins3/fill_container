import React from 'react';
import Reminder from '../Reminder';
import './schedule.css';

export default function Schedule({
  hydroSchedule,
  hydroIntake,
  handleClick,
  status,
  disabled,
}) {
  const renderSchedule = () => {
    return hydroSchedule.map((time, index) => (
      <Reminder
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
        handleClick={handleClick}
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
