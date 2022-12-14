import coldBg from "./assets/cold.jpg";
import hotBg from "./assets/hotBg.jpeg";
import Description from "./components/Description";
import {useEffect, useState} from "react";
import {getFormattedWeatherData} from "./weatherService";


function App() {
    const [city, setCity] = useState("Melbourne, Au")
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState('metric');
    const [bg, setBg] = useState(coldBg);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const data = await getFormattedWeatherData(city, units);
            //console.log(data); shows what we fetched in an object
            setWeather(data);

            //dynamic background
            const threshold = units === "metric"? 20:60;
            if(data.temp  <= threshold) {
                setBg(coldBg)
            } else {
                setBg(hotBg);
            }
            ;

        };
        fetchWeatherData();
    }, [units, city])

    //handle unit button changes
    const handleUnitsClick = (e) => {
        const button = e.currentTarget;
        //  console.log(button.innerText); // °F or °C
        const currentUnit = button.innerText.slice(1);
        //  console.log(currentUnit)         // F or C
        const isCelsius = currentUnit === "C";
        button.innerText = isCelsius ? "°F" : "°C";
        setUnits(isCelsius ? "metric" : "imperial");
    }

    //handle the input city changes
    const enterKeyPressed = (e) => {
        if (e.keyCode === 13) {
            setCity(e.currentTarget.value);
            e.currentTarget.blur();
        }
    };

    return (
        <div className="app" style={{backgroundImage: `url(${bg})`}}>
            <div className="overlay">

                {/*only if weather exists, then render the components.*/}
                {weather && (
                    <div className="container">
                        {/*search input part*/}
                        <div className="section section__inputs">
                            <input onKeyDown={enterKeyPressed} type='text' name='city'
                                   placeholder="Search the City"></input>
                            <button onClick={(e) => handleUnitsClick(e)}> °F</button>
                        </div>

                        <div className='section section__temperature'>
                            {/*weather icon*/}
                            <div className="icon">
                                <h3>{`${weather.name}, ${weather.country}`}</h3>
                                <img src={weather.iconURL} alt="weather icons"></img>
                                <h3>{weather.description}</h3>
                            </div>
                            {/*temperature div*/}
                            <div className="temperature">
                                <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'} `}</h1>
                            </div>
                        </div>

                        {/*bottom description*/}
                        <Description weather={weather} units={units}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
