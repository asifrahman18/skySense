const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL;

export const getAstronomyData = async (location: string) => {
  const currentDate = new Date().toISOString().split('T')[0]; 

  try {
    const response = await fetch(`${BASE_URL}/astronomy.json?key=${API_KEY}&q=${location}&dt=${currentDate}`);

    if (!response.ok) {
      throw new Error('Failed to fetch astronomy data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching astronomy data:', error);
    return null;
  }
};


export const getForecastData = async (location: string) => {
  const days = 3;

  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=no&alerts=no`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
};

export const getWeatherData = async (location: string) => {
  try {
    const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
