"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getWeatherData } from "../api/getWeatherData/route";

interface WeatherDataProps {
  location: string;
}

const Current = ({ location }: WeatherDataProps) => {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setError(null);
      const data = await getWeatherData(location);
      if (data) {
        setWeather(data);
      } else {
        setError("Unable to fetch weather data.");
      }
    };

    fetchWeather();
  }, [location]);

  if (error) return <p className="text-red-500">{error}</p>;

  return weather ? (
    <div className="mt-4 text-center text-white">
      <motion.div
      className="max-w-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="bg-white/10 backdrop-blur-lg shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-black">
            {weather.location.name} - {weather.location.country}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 p-4">
          <p className="text-4xl font-semibold text-black">{weather.current.temp_c}°C</p>
          <p className="text-lg text-black">{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather Icon" className="mx-auto" />
        </CardContent>
      </Card>
    </motion.div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Current;
