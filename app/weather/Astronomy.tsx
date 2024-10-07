'use client';
import { useState, useEffect } from 'react';
import { getAstronomyData } from '../api/getAstronomyData/route';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'; // For icons or images

interface AstronomyDataProps {
  location: string;
}

const Astronomy = ({ location }: AstronomyDataProps) => {
  const [astronomy, setAstronomy] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAstronomy = async () => {
      setError(null);
      const data = await getAstronomyData(location);
      if (data) {
        setAstronomy(data);
      } else {
        setError('Unable to fetch astronomy data.');
      }
    };

    fetchAstronomy();
  }, [location]);

  if (error) return <p className="text-red-500">{error}</p>;

  return astronomy ? (
    <div className="mt-4">
      <h1 className="text-2xl text-center mb-6">Astronomy Data for {astronomy.location.name}, {astronomy.location.country}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
        {/* Left Side: Sunrise & Sunset Cards */}
        <motion.div
          className="lg:col-span-1 space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Sunrise Card */}
          <Card className="bg-white/10 backdrop-blur-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold">Sunrise</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src="/sunrise.png" // Replace with actual icon path
                alt="Sunrise Icon"
                width={40}
                height={40}
              />
              <p className="text-lg mt-2">{astronomy.astronomy.astro.sunrise}</p>
            </CardContent>
          </Card>

          {/* Sunset Card */}
          <Card className="bg-white/10 backdrop-blur-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold">Sunset</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src="/sunset.png" // Replace with actual icon path
                alt="Sunset Icon"
                width={40}
                height={40}
              />
              <p className="text-lg mt-2">{astronomy.astronomy.astro.sunset}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Middle Card: Moon Phase & Illumination */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="bg-white/10 backdrop-blur-md shadow-xl h-full">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">Moon Phase & Illumination</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center h-full">
              <Image
                src="/moonphase.png" // Replace with actual icon path
                alt="Moon Phase Icon"
                width={150}
                height={150}
              />
              <p className="text-lg mt-4">Phase: {astronomy.astronomy.astro.moon_phase}</p>
              <p className="text-lg mt-2">Illumination: {astronomy.astronomy.astro.moon_illumination}%</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side: Moonrise & Moonset Cards */}
        <motion.div
          className="lg:col-span-1 space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Moonrise Card */}
          <Card className="bg-white/10 backdrop-blur-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold">Moonrise</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src="/moonrise.png" // Replace with actual icon path
                alt="Moonrise Icon"
                width={40}
                height={40}
              />
              <p className="text-lg mt-2">{astronomy.astronomy.astro.moonrise}</p>
            </CardContent>
          </Card>

          {/* Moonset Card */}
          <Card className="bg-white/10 backdrop-blur-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold">Moonset</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src="/moonset.png" // Replace with actual icon path
                alt="Moonset Icon"
                width={40}
                height={40}
              />
              <p className="text-lg mt-2">{astronomy.astronomy.astro.moonset}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Astronomy;
