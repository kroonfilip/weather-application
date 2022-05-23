
import React, {useState} from 'react'
import axios from 'axios'
const Startpage = () => {
    
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
   
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&units=metric&lang=se&exclude=hourly,minutely&appid=7b876dba81adf23c3ab28f297a4ac7aa`
    //const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&lang=se&units=metric&appid=bcea789825d8474a842b9612811b70e3`;
    const searchFunction = (event) => {
        if (event.key === 'Enter') {
            axios.get(apiUrl).then((response) => {
                setData(response.data)
                console.log(response.data)
                
        })
        
    }
}       

    
        
    return (
        <>
        <div className="container start-page">
            <h1>Startpage</h1>
            <h2>INFO</h2>
            <p>
                TEXT MED INFORMATION
            </p>
            <h3>Ange stad</h3>
            <input type="text" 
            id ="search-field" 
            onChange={event => setLocation(event.target.value)} 
            value={location}
            onKeyUp={searchFunction}
            placeholder="Sök stad"></input>
            
            <h3>RESULTAT</h3>
            <div id="location-info">
                <div id="current-weather">
            
                    {data.current ? <img src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} alt="weather icon"></img>: null}
                    {data.current ? <p>{data.current.temp}</p>: null}
                    {data.current ? <p>Är just nu: {data.current.weather[0].description}</p>: null}
                </div>

                <div id="weather-seven-days">
                <h3>7 dagar frammåt</h3>
                {data.daily 
                ? data && data.daily.map(item =>{
                        return (
                        <React.Fragment key={item}>
                        <p>Datum: {new Date(item.dt * 1000).toLocaleDateString("en")}</p>
                        <img src = {`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`}></img>
                        <p>Temperatur: {item.temp.day}</p>
                        <p>{item.weather[0].description}</p>
                        
                        </React.Fragment>
                        )
                        
                        
                        

                    }) : "laddar..."}
                
                    
                    
                </div> 
                
            
                    <h3>{data.name}</h3>
                    {data.weather ? <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon"></img>: null}
                    {data.main ? <p>Temperatur: {data.main.temp}°C</p> : null}
                    {data.weather ? <p>Är just nu: {data.weather[0].description}</p>: null}
                    {data.main ? <p>Luftfuktighet: {data.main.humidity}</p> : null}
                    {data.wind ? <p>Vindhastighet: {data.wind.speed} Km/h</p> : null}
                    
                    
                    
                    </div>
                
                
            </div>
        
        </>
        
    )
} 
export default Startpage;