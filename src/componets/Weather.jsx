import React, { useEffect, useState } from "react";

const API_KEY = "39a2bcf93a5e2cc9bbf3119ffc0fb61a";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = (lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ob havo ma'lumotlari yuklanmadi");
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    };

    const location = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeather(latitude, longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolokatsiya topilmadi");
      }
    };

    location();
  }, []);

  // Hato yo'qmi va weather ma'lumotlar to'g'ri yuklandimi tekshirish
  if (error) {
    return <div id="weather">{error}</div>;
  } else if (!weather) {
    return <div id="weather">Yuklanmoqda...</div>;
  } else {
    // weather obyektining to'g'ri formatda bo'lishini tekshirish
    if (!weather.main || !weather.weather || weather.weather.length === 0 || !weather.weather[0].icon) {
      return <div id="weather">Hato: Yaroqli ma'lumot topilmadi</div>;
    }

    // Iconni yuklash
    const iconcode = weather.weather[0].icon;
    const iconurl = `http://openweathermap.org/img/w/${iconcode}.png`;

    // Ma'lumotlarni chiqarish
    return (
      <div>
        <div id="weather" className="sm:flex items-center justify-center hidden">
          <div className="font-bold text-white">{weather.name}:</div>
          <div className="text-white">
            {weather.main.temp}°C <br />
          </div>
          <img
            tabIndex={0}
            role="button"
            className=" mr-2 w-16"
            src={iconurl}
            alt=""
          />
        </div>
      </div>
    );
  }
}

export default Weather;
