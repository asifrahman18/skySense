'use client';
import { useState, useEffect } from 'react';
import { getForecastData } from "../services/weather";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ForecastDataProps {
  location: string;
}

const Forecast = ({ location }: ForecastDataProps) => {
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setError(null);
      const data = await getForecastData(location);
      if (data) {
        setForecast(data);
      } else {
        setError('Unable to fetch forecast data.');
      }
    };

    fetchForecast();
  }, [location]);

  if (error) return <p className="text-red-500">{error}</p>;

  return forecast ? (
    <div className="mt-4 text-center">
      <h1 className="text-2xl mb-6">3-day Forecast for {forecast.location.name}, {forecast.location.country}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecast.forecast.forecastday.map((day: any, index: number) => (
          <motion.div
            key={day.date}
            className="p-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="bg-white/10 backdrop-blur-md shadow-xl rounded-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold">{day.date}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-lg font-bold">{day.day.avgtemp_c}°C</p>
                <p>{day.day.condition.text}</p>
                <img src={day.day.condition.icon} alt="Weather Icon" className="w-16 h-16" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Forecast;
