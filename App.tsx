import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import InputCard from './components/InputCard';
import ResultsCard from './components/ResultsCard';
import { AppMode, LocationInfo, ForecastResult, DailySummary } from './types';
import { fetchGeocoding, fetchWeatherData } from './services/weatherService';
import { predictSolarPotential, aggregateDaily } from './services/modelService';
import { generateReport } from './services/geminiService';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // App State
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [hourlyData, setHourlyData] = useState<ForecastResult[]>([]);
  const [dailyData, setDailyData] = useState<DailySummary[]>([]);
  const [report, setReport] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Orchestrator: Handle Search
  const handleSearch = async (mode: AppMode, query: { city?: string; lat?: number; lon?: number }) => {
    setIsLoading(true);
    setError(null);
    setReport('');

    try {
      // 1. Location Agent
      let locInfo: LocationInfo | null = null;
      if (mode === AppMode.CITY && query.city) {
        locInfo = await fetchGeocoding(query.city);
        if (!locInfo) throw new Error(`Could not find location: ${query.city}`);
      } else if (mode === AppMode.COORDS && query.lat !== undefined && query.lon !== undefined) {
        locInfo = { name: `${query.lat.toFixed(2)}, ${query.lon.toFixed(2)}`, latitude: query.lat, longitude: query.lon };
      }

      if (!locInfo) throw new Error("Invalid location parameters");
      setLocation(locInfo);

      // 2. Weather Agent
      const weatherRaw = await fetchWeatherData(locInfo.latitude, locInfo.longitude);
      if (!weatherRaw) throw new Error("Failed to fetch weather data from the spirits (API).");

      // 3. Forecasting Agent (ML Model Simulation)
      const forecastResults = predictSolarPotential(weatherRaw);
      const summaryResults = aggregateDaily(forecastResults);
      
      setHourlyData(forecastResults);
      setDailyData(summaryResults);

      // 4. Reporting Agent (Gemini)
      const narrative = await generateReport(locInfo, summaryResults);
      setReport(narrative);

    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)}>
      
      <InputCard onSearch={handleSearch} isLoading={isLoading} />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg animate-bounce">
          <div className="flex">
            <div className="flex-shrink-0">
               <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-serif">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {location && hourlyData.length > 0 && dailyData.length > 0 && (
        <ResultsCard 
          location={location}
          hourlyData={hourlyData}
          dailyData={dailyData}
          report={report}
        />
      )}

    </Layout>
  );
};

export default App;