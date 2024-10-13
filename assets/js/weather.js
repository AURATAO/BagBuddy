import axios from "axios";

export const getWeatherAdvice = async (destination) => {
  const apiKey = "39f81314f76119eecdc296abaf713114";
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${destination}`;

  try {
    const res = await axios.get(url);
    const temperature = res.data.current.feelslike;
    const precip = res.data.current.precip;
    const windSpeed = res.data.current.wind_speed;
    const uvIndex = res.data.current.uv_index;

    return { temperature, precip, windSpeed, uvIndex };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
