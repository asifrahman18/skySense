'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Current from '../Current';
import Forecast from '../Forecast';
import Astronomy from '../Astronomy';
import { z } from 'zod';
import { X } from 'lucide-react';

// Zod schema for location input validation
const locationSchema = z.string().min(1, 'Location is required').nonempty('Please enter a valid location');

const Controls = () => {
  const [location, setLocation] = useState('');
  const [searchLocation, setSearchLocation] = useState<string | null>(null);
  const [dataType, setDataType] = useState<'current' | 'forecast' | 'astronomy' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = (type: 'current' | 'forecast' | 'astronomy') => {
    try {
      locationSchema.parse(location);
      setError(null);
      setDataType(type);
      setSearchLocation(location);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  const clearInput = () => {
    setLocation('');
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <div className="relative w-full max-w-md">
        {/* Input field with clear icon */}
        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        {location && (
          <button
            onClick={clearInput}
            className="absolute right-3 top-2"
            aria-label="Clear input"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0">
        <Button onClick={() => handleButtonClick('current')} className="w-full lg:w-auto">
          Show Current Weather
        </Button>
        <Button onClick={() => handleButtonClick('forecast')} className="w-full lg:w-auto">
          Show Forecast
        </Button>
        <Button onClick={() => handleButtonClick('astronomy')} className="w-full lg:w-auto">
          Show Astronomy
        </Button>
      </div>

      {dataType === 'current' && searchLocation && <Current location={searchLocation} />}
      {dataType === 'forecast' && searchLocation && <Forecast location={searchLocation} />}
      {dataType === 'astronomy' && searchLocation && <Astronomy location={searchLocation} />}
    </div>
  );
};

export default Controls;
