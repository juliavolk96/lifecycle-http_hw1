//display time for one city
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

interface CityClockProps {
  name: string;
  timezone: string;
  onRemove: () => void;
}

const CityClock: React.FC<CityClockProps> = ({ name, timezone, onRemove }) => {
  const [time, setTime] = useState<string>(moment().tz(timezone).format('HH:mm:ss'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().tz(timezone).format('HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timezone]);

  return (
    <div className="city-item">
      <span>{name}</span>
      <span>{time}</span>
      <button onClick={onRemove} className="delete-button">Х</button>
    </div>
  );
};

export default CityClock;