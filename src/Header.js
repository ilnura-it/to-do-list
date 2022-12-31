import { useState, useEffect } from 'react';
import { GrUpdate } from 'react-icons/gr';

function Header() {
  const [advice, setAdvice] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState(null);
  const [conditions, setConditions] = useState('');

  const urlWeather = 'https://api.openweathermap.org/data/2.5/';
  const key = 'ef0c88896227d621c8795fb4c74b2fb9';
  const url = 'https://api.adviceslip.com/advice';
  const ipKey = "718b5632c0a14d41a93465fe5dce03ef"
  const urlIP = 'https://api.ipgeolocation.io/ipgeo';

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setAdvice(data.slip.advice);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchIP = async () => {
      const response = await fetch(`${urlIP}?apiKey=${ipKey}`);
      const dataIP = await response.json();
      setCity(dataIP.city);
      setCountry(dataIP.country_name);
    };
    fetchIP();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
     const response = await fetch(
        `${urlWeather}weather?q=Calgary&units=metric&appID=${key}`
      );
      const weatherResult = await response.json();
      const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@2x.png`;
      setTemperature(Math.round(weatherResult.main.temp));
      setConditions(weatherResult.weather[0].description);
      setIcon(weatherIconUrl);
  };
    fetchWeather()
    .catch(console.error);
  }, []);
  
  const current = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = `${current.getDate()} ${
    months[current.getMonth()]
  }, ${current.getFullYear()}`;

  return (
    <div className="app-container">
      <header>
        <div className="container">
          <h2>{date}</h2>
          <div className="containerCityWeather">
            <h3>
              {city}, {country}
            </h3>
            <h3 className="weather">
              <img src={icon} alt="weatherIcon" width="40px" />
              <span>{conditions}</span>, t: {temperature}
              <span>°</span>{' '}
            </h3>
          </div>
        </div>

        <div className="containerAdvice">
          <p>
            Advice Of The Day: <span>"{advice}"</span>
          </p>
          <button onClick={fetchData} className="adviceBtn">
            <GrUpdate style={{fontSize:"18px"}}/>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
