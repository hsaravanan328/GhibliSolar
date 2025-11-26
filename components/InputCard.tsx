import React, { useState } from 'react';
import { AppMode } from '../types';

interface InputCardProps {
  onSearch: (mode: AppMode, query: { city?: string; lat?: number; lon?: number }) => void;
  isLoading: boolean;
}

const InputCard: React.FC<InputCardProps> = ({ onSearch, isLoading }) => {
  const [mode, setMode] = useState<AppMode>(AppMode.CITY);
  const [city, setCity] = useState('Tokyo');
  const [lat, setLat] = useState<string>('35.6895');
  const [lon, setLon] = useState<string>('139.6917');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === AppMode.CITY) {
      onSearch(AppMode.CITY, { city });
    } else {
      onSearch(AppMode.COORDS, { lat: parseFloat(lat), lon: parseFloat(lon) });
    }
  };

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/40 dark:border-white/5 transition-all duration-500 mb-8">
      <div className="flex space-x-6 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={() => setMode(AppMode.CITY)}
          className={`font-serif text-lg pb-1 transition-colors duration-300 ${
            mode === AppMode.CITY
              ? 'text-ghibli-navy dark:text-ghibli-sky border-b-2 border-ghibli-grass'
              : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
          }`}
        >
          City Search
        </button>
        <button
          onClick={() => setMode(AppMode.COORDS)}
          className={`font-serif text-lg pb-1 transition-colors duration-300 ${
            mode === AppMode.COORDS
              ? 'text-ghibli-navy dark:text-ghibli-sky border-b-2 border-ghibli-grass'
              : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
          }`}
        >
          Coordinates
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === AppMode.CITY ? (
          <div>
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">City Name</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-ghibli-grass focus:outline-none transition-shadow"
              placeholder="e.g. Koriko"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">Latitude</label>
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-ghibli-grass focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">Longitude</label>
              <input
                type="number"
                step="any"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-ghibli-grass focus:outline-none"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-ghibli-grass hover:bg-green-400 text-white font-serif font-bold text-lg py-3 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Consulting the Spirits...
            </span>
          ) : (
            'Forecast Solar Potential'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputCard;