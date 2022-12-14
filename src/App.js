import coldBg from "./assets/cold.jpg";
import hotBg from "./assets/hot.jpg";
import Description from "./components/Description";
import {useEffect, useState} from "react";
import{getFormattedWeatherData} from "./weatherService";


function App() {
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState('imperial');

    useEffect(()=>{
        const fetchWeatherData = async()=>{
            const data = await getFormattedWeatherData("paris", units);
            //console.log(data); shows what we fetched in an object
            setWeather(data);
        };
        fetchWeatherData();
    },[])


    return (
        <div className="app" style={{backgroundImage: `url(${coldBg})`}}>
            <div className="overlay">

                {/*only if weather exists, then render the components.*/}
                {weather && (
                    <div className="container">
                        {/*search input part*/}
                        <div className="section section__inputs">
                            <input type='text' name='city' placeholder="Search the City"></input>
                            <button> °F</button>
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
                                <h1>{`${weather.temp.toFixed()} °${units === 'metric'? 'C' : 'F'} `}</h1>
                            </div>
                        </div>

                        {/*bottom description*/}
                        <Description weather={weather} units = {units}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
