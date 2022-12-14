import {API_KEY} from "./api";

// fetched the date,then transfer the icon id to an url.
const makeIconUrl = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

//fetch data
const getFormattedWeatherData = async (city, units = "metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`

    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    // console.log(data); //returns an object
    //destructure the info that we need from data object
    const {
        weather,
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
        wind: {speed},
        sys: {country},
        name,
    } = data;

    const {description, icon} = weather[0];

    //return the data we fetched
    return {
        description,
        //icon,
        iconURL: makeIconUrl(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    }
}
export {getFormattedWeatherData};