import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import WAPPRequest from '../../utils';
import Spinner from '../Spinner';
import StreakDay from '../StreakDay/StreakDay';
import './streak.css';

export default function Streak() {
  const [streakData, setStreakData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getAllDays = async () => {
      const response = await WAPPRequest('/data/alldays', {
        method: 'GET',
      }).catch(() => {
        setError(true);
        return null;
      });

      if (response) {
        let start = response.length < 7 ? 0 : response.length - 7;
        setStreakData(response.slice(start, response.length));
      }
      setLoading(false);
    };

    getAllDays();
  }, []);

  const renderStreak = () => {
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <div>Error</div>;
    }
    return streakData.map((day, index) => (
      <li key={index}>
        <StreakDay data={day} />
      </li>
    ));
  };

  return (
    <div className="streak-container">
      <ul>{streakData.length > 0 && <>{renderStreak()}</>}</ul>
    </div>
  );
}
