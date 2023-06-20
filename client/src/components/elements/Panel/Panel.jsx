import React from 'react';
import Boop from '../Boop';
import Streak from '../Streak';
import Timer from '../Timer';
import './panel.css';

export default function Panel({ date, hydroIntake, hydroSchedule }) {

  return (
    <div className="panel-container">
      <div className="panel-card">
        <Boop rotation={10} timing={150}>
          <img src="/water_img/clock.png" />
        </Boop>
        <Timer hydroSchedule={hydroSchedule} />
      </div>
      <div className="panel-card">
        <Streak />
      </div>
      <div className="panel-card">
        <div>
          <Boop rotation={10} timing={150}>
            <img src="/water_img/calendar.png" />
          </Boop>
          <span style={{ color: 'silver', fontWeight: 'bolder' }}>{date}</span>
        </div>
        <div>
          <Boop rotation={10} timing={150}>
            <img src="/water_img/target.png" />
          </Boop>
          <span style={{ color: 'silver', fontWeight: 'bolder' }}>
            { hydroIntake ? hydroIntake.toFixed(3) : 0} fl oz / {(hydroIntake? hydroIntake: 0 / 8).toFixed(3) } cups
          </span>
        </div>
      </div>
    </div>
  );
}
