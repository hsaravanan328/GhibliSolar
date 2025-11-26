import { WeatherData, ForecastResult, DailySummary } from '../types';

// Heuristic simulation of a RandomForestRegressor for Solar Potential
// Formula approximation: Radiation * (1 - CloudEffect) * TempEfficiency
export const predictSolarPotential = (data: WeatherData): ForecastResult[] => {
  const results: ForecastResult[] = [];

  for (let i = 0; i < data.time.length; i++) {
    const radiation = data.shortwave_radiation[i] || 0; // W/m²
    const cloudCover = data.cloud_cover[i] || 0; // %
    const temp = data.temperature_2m[i] || 20; // Celsius
    
    // Efficiency drops as temperature rises above 25C (approx -0.5% per degree)
    const tempCoeff = 1 - Math.max(0, (temp - 25) * 0.005);
    
    // Cloud impact isn't linear, but let's approximate
    // Heavy clouds (100%) block ~70-90% of radiation usually, but shortwave_radiation
    // from Open-Meteo already accounts for clouds physically. 
    // However, to "simulate" a model predicting specific panel output (kW):
    
    // Let's assume a standard 5kW residential system with 18% efficiency panels ~ 28m2
    // Power (kW) = Radiation (kW/m2) * Area * Efficiency * SystemLosses * TempCoeff
    
    const radiationKW = radiation / 1000;
    const systemSizeM2 = 28; 
    const panelEfficiency = 0.18;
    const systemLosses = 0.85; // Inverter, wiring, dust
    
    const potential = Math.max(0, radiationKW * systemSizeM2 * panelEfficiency * systemLosses * tempCoeff);

    results.push({
      hour: data.time[i],
      solarPotential: parseFloat(potential.toFixed(3)),
      temperature: temp,
      cloudCover: cloudCover
    });
  }

  return results;
};

export const aggregateDaily = (hourly: ForecastResult[]): DailySummary[] => {
  const dailyMap = new Map<string, { total: number, count: number, max: number, cloudTotal: number }>();

  hourly.forEach(h => {
    const date = h.hour.split('T')[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, { total: 0, count: 0, max: 0, cloudTotal: 0 });
    }
    const entry = dailyMap.get(date)!;
    entry.total += h.solarPotential;
    entry.cloudTotal += h.cloudCover;
    entry.count += 1;
    if (h.solarPotential > entry.max) entry.max = h.solarPotential;
  });

  return Array.from(dailyMap.entries()).map(([date, stats]) => ({
    date,
    avgPotential: parseFloat((stats.total / stats.count).toFixed(3)),
    maxPotential: parseFloat(stats.max.toFixed(3)),
    avgCloudCover: Math.round(stats.cloudTotal / stats.count)
  })).slice(0, 3); // Return 3 days
};