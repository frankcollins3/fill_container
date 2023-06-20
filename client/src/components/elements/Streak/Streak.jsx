import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
// import WAPPRequest from '../../utils';
import Spinner from '../Spinner';
import StreakDay from '../StreakDay/StreakDay';
import currentuserJSONparse from '../../../utility/currentuserJSONparse'
import {useImage} from '../../../utility/Contexts/ImgContext'
import getAllUserData from '../../../utility/fetch/getAllUserData'
import './streak.css';

export default function Streak() {
  const [streakData, setStreakData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [localContHover, setLocalContHover] = useState(false)
  const { mouseDroplet, puppetCup } = useImage()

  useEffect(() => {
   (async() => {
      let currentUser = await currentuserJSONparse()
      let currentuserID = currentUser.id
      let currentUserDataArray = await getAllUserData(currentuserID)
      let dataLength = currentUserDataArray.length
      console.log('currentUserDataArray')
      console.log(currentUserDataArray)

      if (currentUserDataArray) {
        let start = dataLength < 7 ? 0 : dataLength - 7
        setStreakData(currentUserDataArray.slice(start, dataLength))
      } else { return }
   })()

  }, []);

  const renderStreak = () => {
    if (loading) {
      // return <Spinner />;
    }
    if (error) {
      return <div>Error</div>;
    }
    return streakData.map((day, index) => (
      <li key={index}>
        <img style={{ margin: '0 0.5em'}} src={mouseDroplet}/>
        {/* <StreakDay data={day} /> */}
      </li>
    ));
  };

  const renderStreakExplain = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <img style={{ height: '35px', width: '35px'}} src={puppetCup}/>
        <h6 style={{ color: 'silver', fontWeight: 'bolder', }}> Sip Streak </h6>
      </div>
        )
  }

  const contHoverFunc = () => {
      setTimeout( () => setLocalContHover(true), 1000)
      setTimeout( () => setLocalContHover(false), 3000)
  }

  return (
    <div className="streak-container">
        {
    localContHover === false ? <ul onMouseLeave={contHoverFunc}>{streakData.length > 0 && <>{renderStreak()}</>} </ul> : <ul>{streakData.length > 0 && <>{renderStreakExplain()}</>} </ul> 
        }          
    </div>
  );
}
