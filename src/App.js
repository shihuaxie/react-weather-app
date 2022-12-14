import coldBg from "./assets/cold.jpg";
import hotBg from "./assets/hot.jpg";

function App() {
    return (
        <div className="app" style={{backgroundImage: `url(${coldBg})`}}>
            <div className="overlay">
                <div className="container">
                    {/*search input part*/}
                    <div className="section section__inputs">
                        <input type='text' name='city' placeholder="Search the City"></input>
                        <button> °F</button>
                    </div>

                    <div className='section section__temperature'>
                        {/*weather icon*/}
                        <div className="icon">
                            <h3>London, GB</h3>
                            <img src="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-256.png"
                                 alt="weather icons"></img>
                            <h3>Sunny</h3>
                        </div>
                        {/*temperature div*/}
                        <div className="temperature">
                            <h1>28°C</h1>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
