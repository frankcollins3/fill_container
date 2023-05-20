import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import WAPPRequest from '../../utils';
import Spinner from '../Spinner';
import './settings.css';

export default function Settings() {
  const history = useHistory();

  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [reminder, setReminder] = useState(0);
  const [units, setUnits] = useState('imperial');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getUserSettings = async () => {
      const response = await WAPPRequest('/profile/settings', {
        method: 'GET',
      }).catch((error) => console.log(error));

      if (response) {

        setAge(Object.keys(response).length ? response.settings.age : 25);
        setWeight(
          Object.keys(response).length ? response.settings.weight : 150
        );
        setHeight(Object.keys(response).length ? response.settings.height : 65);
        setStartTime(
          Object.keys(response).length ? response.settings.startTime : 9
        );
        setEndTime(
          Object.keys(response).length ? response.settings.endTime : 22
        );
        setReminder(
          Object.keys(response).length ? response.settings.reminder : 1
        );
        setLoading(false);
      }
    };
    getUserSettings();
  }, []);

  const renderDropdown = (num) => {
    const times = new Array(24).fill('');
    times[num] = true;
    return times.map((time, index) => (
      <option key={index} value={index}>{`${index}:00`}</option>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSettings = {
      age,
      weight: units === 'imperial' ? weight : Math.floor(weight * 2.205),
      height: units === 'imperial' ? height : Math.floor(height / 2.54),
      startTime,
      endTime,
      reminder,
    };

    const response = await WAPPRequest('/profile/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSettings),
    });

    history.push('/');
    window.location.reload();
  };

  const handleReset = async () => {
    await WAPPRequest('/profile/reset', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    history.push('/');
    window.location.reload();
  };

  const renderSettings = () => {
    if (loading) {
      history.push('/settings');
    }
    if (error) {
      return <div>Error</div>;
    }
    return (
      <>
        <div className="settings-title">SETTINGS</div>
        <button
          className="settings units"
          onClick={() => {
            setUnits('imperial');
          }}
        >
          Imperial
        </button>
        <button
          className="settings units"
          onClick={() => {
            setUnits('metric');
          }}
        >
          Metric
        </button>
        <div>{units.toUpperCase()}</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="age">
              <div>Age</div>
            </label>
            <input
              type="range"
              id="age"
              name="age"
              min="0"
              max="100"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
            <div>{age}</div>
          </div>
          <div className="form-group">
            <label htmlFor="weight">
              <div>Weight</div>
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              min="0"
              max={units === 'imperial' ? '500' : '250'}
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />
            <div>
              {units === 'imperial'
                ? `${weight} lbs`
                : `${weight} kg`}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="height">
              <div>Height</div>
            </label>
            <input
              type="number"
              id="height"
              name="height"
              min="0"
              max={units === 'imperial' ? '100' : '275'}
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
            />
            <div>
              {units === 'imperial'
                ? `${Math.floor(height / 12)}' ${height % 12}`
                : `${height} cm`}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="startTime">
              <div>What time do you start your day:</div>
            </label>
            <select
              name="startTime"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(parseInt(e.target.value))}
            >
              {renderDropdown(startTime)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="endTime">
              <div>What time do you end your day:</div>
            </label>
            <select
              name="endTime"
              id="endTime"
              value={endTime}
              onChange={(e) => {
                setEndTime(parseInt(e.target.value));
              }}
            >
              {renderDropdown(endTime)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="reminder">
              <div> Notification Intensity</div>
            </label>
            <input
              type="range"
              id="reminder"
              name="reminder"
              min="1"
              max="5"
              value={reminder}
              onChange={(e) => setReminder(parseInt(e.target.value))}
            />
            <div>Every {reminder} Hours</div>
          </div>
        </form>
        <button className="settings" type="submit" onClick={handleSubmit}>
          Update
        </button>
        <button className="settings" onClick={handleReset}>
          Reset
        </button>
      </>
    );
  };

  return <div className="settings-container">{renderSettings()}</div>;
}
