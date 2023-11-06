import React from 'react';
import CityClock from './CityClock';

interface City {
  name: string;
  timezone: string;
}

interface CityListProps {
  cities: City[];
  onRemoveCity: (index: number) => void;
}

const CityList: React.FC<CityListProps> = ({ cities, onRemoveCity }) => {
  return (
    <div className="city-list">
      {cities.map((city, index) => (
        <CityClock
          key={index}
          name={city.name}
          timezone={city.timezone}
          onRemove={() => onRemoveCity(index)}
        />
      ))}
    </div>
  );
};

export default CityList;