import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Calendar from 'react-calendar';
import './dashboard.css';
import 'react-calendar/dist/Calendar.css';

import currentuserJSONparse from '../../../utility/currentuserJSONparse'
import getAllUserData from '../../../utility/fetch/getAllUserData'
import {useImage} from '../../../utility/Contexts/ImgContext'
import {connect, useDispatch} from 'react-redux'
import { set } from 'date-fns';
import Spinner from '../Spinner';
import $ from 'jquery';

import { TOGGLE_CALENDAR_DAY_DRIED_UP } from "../../../redux/actions"



 function Dashboard({ CALENDAR_DAY_DRIED_UP, TOGGLE_CALENDAR_DAY_DRIED_UP }) {
  const [value, onChange] = useState(new Date());
  const [hydroData, setHydroData] = useState();
  const [hydroDays, setHydroDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [currentDay, setCurrentDay] = useState();
  $('*').css('cursor', `url('/water_img/mouse_droplet.png'), auto`)
  $('*').on('mouseenter', (event) => {
    $(event.target).css('cursor', `normal`)
  })

  // const { TOGGLE_CALENDAR_DAY_DRIED_UP, CALENDAR_DAY_DRIED_UP } = props

  const { close, confirmation } = useImage()

  useEffect(() => {
    (async() => {
       let currentUser = await currentuserJSONparse()
       let currentuserID = currentUser.id

       let currentUserDataArray = await getAllUserData(currentuserID)
       let dataLength = currentUserDataArray.length
      
       const datePROMISE = new Promise( (resolve, reject) => {
          setHydroData(currentUserDataArray);
          const getDates = currentUserDataArray.map((day, index) => {
            console.log('day')
            console.log(day)
            const formattedDate = moment(day.date, 'YYYY-M-D').format('MM-DD-YYYY');
            return formattedDate;
          });
          resolve(getDates ? getDates : "no dates")          
        })
        datePROMISE
        .then( (actualdates) => {
            console.log('actualdates')
            console.log(actualdates)
        })              


    })()
 
   }, []);


  function getDataForClickedDay(highlightedDay) {
    const formatHighlightDay = moment(highlightedDay, 'YYYY-M-D').format('MM-DD-YYYY')      

    $('.react-calendar__tile--now').css('backgroundColor', 'orange')
    $('.react-calendar__tile--now').css('border', '1px solid #73defe')
      // const formattedDate = moment(day.date, 'YYYY-M-D').format('MM-DD-YYYY');
      //       return formattedDate;

    const getDay = hydroData.find(
      (day) =>
        moment(day.date, 'YYYY-M-D').format('MM-DD-YYYY') === formatHighlightDay
        // moment(highlightedDay, 'YYYY-M-D').format('MM-DD-YYYY')
    );
    if (getDay) {
      setSelectedDay(getDay);
    } else {
      setSelectedDay(null)
      if (CALENDAR_DAY_DRIED_UP === false) TOGGLE_CALENDAR_DAY_DRIED_UP()
    }
  }

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const formatDate = moment(date, 'YYYY-M-D').format('MM-DD-YYYY');
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
              <div style={{ color: 'silver', fontWeight: 'bolder'}} className="calendar-date">
                  {moment(selectedDay.date, 'YYYY-MM-DD').format('ddd, MMM D YYYY')}
                  {/* {moment(selectedDay.date, 'YYYY-MM-DD').format('ddd, MMM D YYYY')} */}
                {/* {moment(selectedDay.date,).format('ddd, MMM-DD-YY')} */}
              </div>
              <div className="calendar-progress">
                Progress: {Math.ceil(selectedDay.progress)}%
              </div>
              <div className="calendar-status">
                {selectedDay.status.map((d, index) => (
                  <div key={`div${index}`}>
                    {d === 'check' ? (     // jenny smart: keep non set variables false because they trigger ternary to falsy block. Problem is you can't type the state in an interface. toggle <booleanFalse> to <truthyString'Check'>
                      <img key={`confirm${index}`} src={confirmation} />
                    ) : (
                      <img key={`close${index}`} src={close} />
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            // loading bar 
            <div style={{ color: 'silver', fontWeight: 'bolder'}} className="calendar-progress"> {CALENDAR_DAY_DRIED_UP ? "All Dried Up" : "Pick A Highlighted Day"} </div>            
            // <div className="calendar-progress">Pick A Highlighted Day</div>
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


const mapStateToProps = (state) => ({
    CALENDAR_DAY_DRIED_UP: state.CALENDAR_DAY_DRIED_UP
})

const mapDispatchToProps = (dispatch) => ({
    TOGGLE_CALENDAR_DAY_DRIED_UP: () => dispatch(TOGGLE_CALENDAR_DAY_DRIED_UP())
})

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default ConnectedDashboard
