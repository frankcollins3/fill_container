import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Calendar from 'react-calendar';
import './dashboard.css';
import 'react-calendar/dist/Calendar.css';
// import WAPPRequest from '../../utils';
import { set } from 'date-fns';
import Spinner from '../Spinner';
import $ from 'jquery';

export default function Dashboard() {
  const [value, onChange] = useState(new Date());
  const [hydroData, setHydroData] = useState();
  const [hydroDays, setHydroDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  $('*').css('cursor', `url('/water_img/mouse_droplet.png'), auto`)
  $('*').on('mouseenter', (event) => {
    $(event.target).css('cursor', `normal`)
  })

  // useEffect(() => {
  //   const getAllDays = async () => {
  //     const response = await WAPPRequest('/data/alldays', {
  //       method: 'GET',
  //     }).catch(() => {
  //       setError(true);
  //       return null;
  //     });

  //     if (response) {
  //       setHydroData(response);
  //       const getDates = response.map((day, index) => {
  //         return moment(day.date).tz('UTC').format('MM-DD-YYYY');
  //       });

  //       setHydroDays(getDates);
  //     }
  //     setLoading(false);
  //   };

  //   getAllDays();
  // }, []);

  function getDataForClickedDay(highlightedDay) {
    const formatHighlightDay = moment(highlightedDay)
      .tz('UTC')
      .format('MM-DD-YYYY');

    const getDay = hydroData.find(
      (day) =>
        moment(day.date).tz('UTC').format('MM-DD-YYYY') === formatHighlightDay
    );
    setSelectedDay(getDay);
  }

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const formatDate = moment(date).tz('UTC').format('MM-DD-YYYY');
      if (hydroDays.find((dDate) => formatDate === dDate)) {
        return 'calendarHighlight';
      }
    }
  }

  const renderDashboard = () => {
    if (loading) {
    // return <Spinner />;
    }

    if (error) {
      return <div>Error</div>;
    }

    return (
      <>
        <div className="calendar-details">
          {selectedDay ? (
            <>
              <div className="calendar-date">
                {moment(selectedDay.date).tz('UTC').format('ddd, MMM-DD-YY')}
              </div>
              <div className="calendar-progress">
                Progress: {Math.ceil(selectedDay.progress * 100)}%
              </div>
              <div className="calendar-status">
                {selectedDay.status.map((d) => (
                  <div>
                    {d ? (
                      <img src="/img/confirmation.png" />
                    ) : (
                      <img src="/img/close (1).png" />
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="calendar-progress">Pick A Highlighted Day</div>
          )}
        </div>
        <div className="calendar">
          <Calendar
            tileClassName={tileClassName}
            // tileClassName={tileClassName}
            onChange={onChange}
            value={value}
            onClickDay={(value, event) => getDataForClickedDay(value)}
          />
        </div>
      </>
    );
  };

  return <div className="dashboard-container">{renderDashboard()}</div>;
}
