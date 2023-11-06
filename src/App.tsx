import React, { useState, useEffect } from 'react';
import './App.css';
import CityList from './components/CityList';

const App: React.FC = () => {
  const [cities, setCities] = useState<{ name: string; timezone: string }[]>([]);
  const [newCityName, setNewCityName] = useState<string>('');
  const [newCityTimezone, setNewCityTimezone] = useState<string>('');

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('cities') || '[]');
    setCities(savedCities);
  }, []);

  const addCity = () => {
    if (newCityName && newCityTimezone) {
      const city = { name: newCityName, timezone: newCityTimezone };
      setCities([...cities, city]);

      setNewCityName('');
      setNewCityTimezone('');

      localStorage.setItem('cities', JSON.stringify([...cities, city]));
    }
  };

  const removeCity = (index: number) => {
    const updatedCities = [...cities];
    updatedCities.splice(index, 1);
    setCities(updatedCities);

    localStorage.setItem('cities', JSON.stringify(updatedCities));
  };

  return (
    <div className="container">
      <div>
        <input
          type="text"
          placeholder="Название"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
        />
        <select
          value={newCityTimezone}
          onChange={(e) => setNewCityTimezone(e.target.value)}
        >
          <option value="">Выберите смещение времени</option>
          {Array.from({ length: 25 }, (_, i) => i - 12).map((offset) => (
            <option key={offset} value={offset}>
              {`GMT${offset >= 0 ? `+${offset}` : offset}`}
            </option>
          ))}
        </select>
        <button onClick={addCity} className="add-button">Добавить</button>
      </div>
      <CityList cities={cities} onRemoveCity={removeCity} />
    </div>
  );
};

export default App;
