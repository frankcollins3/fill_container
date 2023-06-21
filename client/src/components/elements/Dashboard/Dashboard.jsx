import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import Calendar from 'react-calendar';
import './dashboard.css';
import 'react-calendar/dist/Calendar.css';

import currentuserJSONparse from '../../../utility/currentuserJSONparse'
import getAllUserData from '../../../utility/fetch/getAllUserData'
import {useImage} from '../../../utility/Contexts/ImgContext'
import {useRegex} from '../../../utility/Contexts/RegexMenu'
import CSS from '../../../utility/CSS'
import {currentDayBorderOn} from '../../../utility/UtilityValues'
import {currentDayBorderOff} from '../../../utility/UtilityValues'
import {connect, useDispatch} from 'react-redux'
import { set } from 'date-fns';
import Spinner from '../Spinner';
import $ from 'jquery';

import { TOGGLE_CALENDAR_DAY_DRIED_UP } from '../../../redux/actions'

 function Dashboard( { CALENDAR_DAY_DRIED_UP, TOGGLE_CALENDAR_DAY_DRIED_UP }) {
  const [value, onChange] = useState(new Date());
  const [hydroData, setHydroData] = useState();
  const [hydroDays, setHydroDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const tilenow = $('.react-calendar__tile--now')

  const { close, confirmation, bg } = useImage()
  const { dayofMonthSplit } = useRegex()

  useEffect(() => {
    (async() => {
       let currentUser = await currentuserJSONparse()
       let currentuserID = currentUser.id
       let currentUserDataArray = await getAllUserData(currentuserID)
       let dataLength = currentUserDataArray.length      
       const datePROMISE = new Promise( (resolve, reject) => {
          setHydroData(currentUserDataArray);          
          const getDates = currentUserDataArray.map((day, index) => {            
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


   async function getDataForClickedDay(highlightedDay) {

    const prekey = await axios.get('http://localhost:5000/fill_cont?query={ENV_WEATHER}')
    const key = prekey.data.data.ENV_WEATHER
    console.log('prekey')
    console.log(prekey)

    let city= 'bergenfield'

    // get input from user on city name to be used at the end of the /locations/ query so described below:       &q=bergenfield&offset=25

    const rainPROMISE = new Promise(async (resolve, reject) => {
      const pre_data = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}&offset=25`)    
      // const pre_data = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=CG0C6JlnXhBUOi4R9JlJILWZGyBP6LkD&q=bergenfield&offset=25')    
      const weatherdata = await pre_data.data[0]
      let locationKey = weatherdata.Key
  
      const currentLocationConditions = await  axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}`)      
      resolve(currentLocationConditions ? currentLocationConditions : "no weather conditions or no city or both")
    })
    rainPROMISE
    .then( (todayCityConditions) => {
          console.log('todayCityConditions')
          console.log(todayCityConditions)
          let rainToday = todayCityConditions.data[0].HasPrecipitation
          console.log('rainToday')
          console.log(rainToday)
    })



    console.log('hydroData')
    console.log(hydroData)

    const formatHighlightDay = moment(highlightedDay, 'YYYY-M-D').format('MM-DD-YYYY')      
    const today = new Date().getDate()  
    const todaySlicer = formatHighlightDay.slice(3, 5)
  
    if (today.toString() === todaySlicer)  currentDayBorderOn($(tilenow)) 
    else if (today.toString() !== todaySlicer) currentDayBorderOff($(tilenow))


    const getDay = hydroData.find(      
      (day) =>
        moment(day.date, 'YYYY-M-D').format('MM-DD-YYYY') === formatHighlightDay
        // moment(highlightedDay, 'YYYY-M-D').format('MM-DD-YYYY')
    );
    if (getDay) {      
      console.log('getDay')
      console.log(getDay)
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
      const formatDate = moment(date.date, 'YYYY-M-D').format('MM-DD-YYYY')
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
                {moment(selectedDay.date, 'YYYY-M-D').format('ddd, MMM-DD-YY')}
              </div>
              <div className="calendar-progress">
                        {
                          selectedDay.progress < 1
                               ?  <img style={{ marginTop: '0.5em'}} src={bg}/>
                               : <pre> Progress: {Math.ceil(selectedDay.progress)}% </pre>
                        }
                
              </div>
              <div className="calendar-status">
              {
                  selectedDay.status[0]
                            ?
              selectedDay.status[0].split(',').map((d, index) => (
                  <div key={`div${index}`}>
                    {d.trim() === 'check' ? (
                      <img key={`confirm${index}`} src={confirmation} />
                    ) : (
                      <img key={`close${index}`} src={close} />
                    )}
                  </div>
                ))  
                        :
                  <pre></pre>
                
                }
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

const mapStateToProps = (state) => ({
  CALENDAR_DAY_DRIED_UP: state.CALENDAR_DAY_DRIED_UP
})

const mapDispatchToProps = (dispatch) => ({
  TOGGLE_CALENDAR_DAY_DRIED_UP: () => dispatch(TOGGLE_CALENDAR_DAY_DRIED_UP())
})

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default ConnectedDashboard
