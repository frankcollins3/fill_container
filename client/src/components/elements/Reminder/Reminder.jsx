import React, { useState } from 'react';
import './reminder.css';

export default function Reminder({
  time,
  amt,
  amtper,
  percent,
  index,
  handleClick,
  status,
  disabled,
}) {
  const [isShown, setIsShown] = useState(false);
  // reminder component
  return (
    <>
      <li key={index}>
        <button
          disabled={disabled[index]}
          className="btn"
          onClick={() => handleClick(index)}
          style={{
            backgroundColor: `#98ddfc${percent}`,
            width: `${percent}%`,
          }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <span>
            <span>
              {status[index] === 'check' ? '✔DONE!⭐' : amtper.toFixed(2)} /{' '}
              {amt.toFixed(0)} fl oz
            </span>
          </span>
        </button>
        <div className="timeline-text">
          <span
            className="timeline-display"
            style={{ color: `${disabled[index] ? '#00000030' : '#000000'}` }}
          >
            {time <= 12 ? time : time - 12}:00 {time < 12 ? 'am' : 'pm'}
          </span>

          {isShown && <div className="timeline-hover"><img src="/img/water-drop.png" /></div>}
        </div>
      </li>
    </>
  );
}
