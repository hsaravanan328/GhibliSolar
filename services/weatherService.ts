import { WeatherData, LocationInfo } from '../types';

export const fetchGeocoding = async (city: string): Promise<LocationInfo | null> => {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return {
        name: data.results[0].name,
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
      };
    }
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      hourly: 'temperature_2m,relative_humidity_2m,cloud_cover,shortwave_radiation,wind_speed_10m',
      timezone: 'auto',
      forecast_days: '3'
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    const data = await response.json();

    if (data.hourly) {
      return data.hourly as WeatherData;
    }
    return null;
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
};