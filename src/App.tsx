import { useEffect, useState } from "react";
import "./App.css";

type Weather = {
    name: string,
    main: { temp: string },
    weather: [{
        id: number,
        type: "Thunderstorm" | "Drizzle" | "Rain" | "Snow" | "Mist" | "Clear" | "Clouds",
    }]
}

export default () => {
    const [city, setCity] = useState("New York");
    const [weather, setWeather] = useState<Weather>();

    useEffect(() => {
        fetch(api(city)).then(data => data.json())
            .then((wet: Weather) => {
                console.log(wet)
                wet = parseWeather(wet);
                setWeather(wet);
            });
    }, []);

    function search() {
        fetch(api(city)).then(data => data.json())
            .then((wet: Weather) => {
                setWeather(parseWeather(wet));
            });
    }

    return <div
        className="app"
        style={{
            backgroundImage: `url(./assets/${weather?.weather[0].id}.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}
    >
        <div className="search">
            <input
                type="text"
                value={city}
                onInput={e => setCity(e.currentTarget.value)}
            />
            <div className="search-btn" onClick={search}>Go</div>
        </div>
        <div className="main">
            <div className="city">{weather?.name}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="temp">{weather?.main.temp}°C</div>
            <div className="type">{weather?.weather[0].type}</div>
        </div>
    </div>
}

function api(city: string) {
    return "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&APPID=fcc8de7015bbb202209bbf0261babf4c";
}

function dateBuilder(d: Date) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function parseWeather(weather: Weather) {
    weather = {
        name: weather.name,
        main: {
            temp: weather.main.temp,
        },
        weather: [{
            id: weather.weather[0].id,
            type: weather.weather[0].type,
        }]
    }

    const discriminator = weather.weather[0].id.toString().split('')[0];
    if (discriminator == '2') {
        weather.weather[0].id = 200;
        weather.weather[0].type = "Thunderstorm";
    } else if (discriminator == '3') {
        weather.weather[0].id = 300;
        weather.weather[0].type = "Drizzle";
    } else if (discriminator == '5') {
        weather.weather[0].id = 500;
        weather.weather[0].type = "Rain";
    } else if (discriminator == '6') {
        weather.weather[0].id = 600;
        weather.weather[0].type = "Snow";
    } else if (discriminator == '7') {
        weather.weather[0].id = 700;
        weather.weather[0].type = "Mist";
    } else {
        const id = weather.weather[0].id;
        if (id > 800) {
            weather.weather[0].id = 900;
            weather.weather[0].type = "Clouds";
        }
    }

    return weather;
} 