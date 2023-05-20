import moment from 'moment-timezone';
import React from 'react';
import './streakday.css';

export default function StreakDay({ data }) {
  const dateString = moment(data.date).tz('UTC').format('DD-dd');

  return (
    <>
      <div style={{ fontSize: '20px' }}>{dateString}</div>
      <div className="streak-display">
        <div
          className="streak-progress"
          style={{
            background: `linear-gradient(0deg, rgba(114,211,254,1) 0%, rgba(255,255,255,0) ${Math.ceil(data.progress*100)}%)`,
          }}
        >
          <img src="/img/clear-water-drop.png" />
        </div>
      </div>
      {/* <div>{data.progress.toFixed(0)}%</div> */}
    </>
  );
}
