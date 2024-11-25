import { useState, useEffect } from "react";
import { Spinner, Alert, Image } from "react-bootstrap";

export const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: "",
  });

  const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=78a48bb2250f4febbee165816242309&q=Benito Juarez`;

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError({ error: false, message: "" });

      try {
        const response = await fetch(API_WEATHER);
        const data = await response.json();

        if (data.error) throw { message: data.error.message };

        setWeather({
          city: data.location.name,
          country: data.location.country,
          temp: data.current.temp_c,
          condition: data.current.condition.code,
          icon: data.current.condition.icon,
          conditionText: data.current.condition.text,
        });
      } catch (error) {
        setError({ error: true, message: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getTemperatureMessage = (temp) => {
    if (temp >= 30) return "Hace calor, mantente hidratado!";
    if (temp <= 10) return "Hace frío, abrígate bien!";
    return "El clima es templado, un buen día para salir.";
  };

  return (
    <div>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Cargando...</span>
        </div>
      )}

      {error.error && (
        <Alert variant="danger" className="mt-3">
          {error.message}
        </Alert>
      )}

      {weather.city && !loading && (
        <div className="text-center">
          <h5>{weather.city}, {weather.country}</h5>
          <Image src={weather.icon} alt={weather.conditionText} rounded className="my-2" style={{ width: "50px", height: "50px" }} />
          <h6>{weather.temp} °C</h6>
          <p className="mb-0">{weather.conditionText}</p>
          <small className="text-muted">{getTemperatureMessage(weather.temp)}</small>
        </div>
      )}
    </div>
  );
};
