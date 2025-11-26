export interface WeatherData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  cloud_cover: number[];
  shortwave_radiation: number[];
  wind_speed_10m: number[];
}

export interface ForecastResult {
  hour: string;
  solarPotential: number; // Simulated kW output
  temperature: number;
  cloudCover: number;
}

export interface DailySummary {
  date: string;
  avgPotential: number;
  maxPotential: number;
  avgCloudCover: number;
}

export interface LocationInfo {
  name: string;
  latitude: number;
  longitude: number;
}

export enum AppMode {
  CITY = 'CITY',
  COORDS = 'COORDS',
}
