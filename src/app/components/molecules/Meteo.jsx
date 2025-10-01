

"use client"
import { useEffect, useState } from "react"
import './Meteo.css'



export default function MeteoSection(){
    const [city, setCity] = useState("Rome"); // città di default
    const [selectedCity, setSelectedCity] = useState("Rome");
    const [forecast, setForecast] = useState(null);
    const [meteo, setMeteo] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchMeteo = async (selectedCity) => {
        setLoading(true);
        const res = await fetch(`/api/meteo?city=${selectedCity}&endpoint=current`);
        const data = await res.json();
        setMeteo(data);
        setLoading(false);
    };
    
    const fetchForecast = async (selectedCity)=>{
        setLoading(true)
        const res = await fetch(`/api/meteo?city=${selectedCity}&endpoint=forecast`)
        const data = await res.json()
        setForecast(data.forecast.forecastday);
        setLoading(false)
    }
    
    // fetch iniziale
    useEffect(() => {
        fetchMeteo(city);
        fetchForecast(city)
    }, []);
    
    const handleSearch = () => {
        if (city.trim() !== "") fetchForecast(city) , fetchMeteo(city),  setSelectedCity(city); ;
    };
    
    
    return(
        <div className="MeteoSection">
        <h2 className="text-xl font-bold mb-2">Meteo</h2>
        
        {/* Input città */}
        <div className="input_zone">
        <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-1 flex-1"
        placeholder="Inserisci città"
        />
        <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-3 py-1 rounded"
        >
        Cerca
        </button>
        </div>
        <div className="Meteo_wrapper">
  
        <div className="forecast_wrapper">
        {loading ? (
            <p>Caricamento meteo...</p>
        ) : forecast ? (
            forecast.map((day) => (
                
                <div key={day.date} className="forecast_card">
                <div className="fore_card_left">
                    <h4>{selectedCity}</h4>
                <h3>{day.date}</h3>
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                </div>
                 <div className="fore_card_right">
                <p>{day.day.condition.text}</p>
                    <div className="right_temp">
                        <p>{day.day.mintemp_c}°C</p>
                        <p>{day.day.maxtemp_c}°C</p>
                    </div>
                 </div>
                </div>
            ))
        ) : (
            <p>Dati non disponibili</p>
        )}
        </div>

            <div className="current_wrapper">
  {loading ? (
    <p>Caricamento meteo...</p>
  ) : forecast && forecast.length > 0 && forecast[0].hour ? (
    <div className="hourly_forecast">
      <h3>Meteo ora per ora {selectedCity} - {forecast[0].date}</h3>
      <div className="hourly_cards">
        {forecast[0].hour.map((hourData) => (
          <div key={hourData.time} className="hour_card">
            <p>{hourData.time.split(" ")[1]}</p>
            <img src={hourData.condition.icon} alt={hourData.condition.text} />
            <p>{hourData.temp_c}°C</p>
            <p>{hourData.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>Dati orari non disponibili</p>
  )}
</div>

        
        </div>
        
        </div>
    );
    
}