import React from 'react';
import { ForecastResult, DailySummary, LocationInfo } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ReactMarkdown from 'react-markdown';

interface ResultsCardProps {
  location: LocationInfo;
  hourlyData: ForecastResult[];
  dailyData: DailySummary[];
  report: string;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ location, hourlyData, dailyData, report }) => {
  // Format data for chart to look nicer
  const chartData = hourlyData.slice(0, 72).map(d => ({
    ...d,
    timeLabel: new Date(d.hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    dayLabel: new Date(d.hour).toLocaleDateString([], { weekday: 'short' })
  }));

  return (
    <div className="space-y-8 animate-[fadeIn_1s_ease-out]">
      
      {/* Report Section */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border-2 border-ghibli-gold/30">
        <h2 className="text-2xl font-serif font-bold text-ghibli-navy dark:text-ghibli-sky mb-4 flex items-center">
          <span className="mr-2">🌱</span> Spirit's Message for {location.name}
        </h2>
        <div className="prose prose-lg dark:prose-invert font-serif leading-relaxed text-gray-700 dark:text-gray-300">
           <ReactMarkdown>{report}</ReactMarkdown>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/40 dark:border-white/5">
        <h3 className="text-xl font-serif font-bold text-gray-700 dark:text-gray-200 mb-6 pl-2 border-l-4 border-ghibli-grass">
          Solar Potential (72 Hours)
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffd700" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ffd700" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" opacity={0.3} />
              <XAxis 
                dataKey="timeLabel" 
                tick={{ fontSize: 12, fill: '#888' }} 
                tickLine={false}
                axisLine={false}
                interval={11}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#888' }} 
                tickLine={false}
                axisLine={false}
                label={{ value: 'kW', angle: -90, position: 'insideLeft', fill: '#888' }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: '#666', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="solarPotential" 
                stroke="#ffd700" 
                fillOpacity={1} 
                fill="url(#colorSolar)" 
                strokeWidth={3}
                name="Solar Potential"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/40 dark:border-white/5 overflow-hidden">
        <h3 className="text-xl font-serif font-bold text-gray-700 dark:text-gray-200 mb-6 pl-2 border-l-4 border-ghibli-grass">
          Daily Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 font-serif font-bold text-gray-600 dark:text-gray-400">Date</th>
                <th className="pb-3 font-serif font-bold text-gray-600 dark:text-gray-400">Avg. Potential (kW)</th>
                <th className="pb-3 font-serif font-bold text-gray-600 dark:text-gray-400">Max Potential (kW)</th>
                <th className="pb-3 font-serif font-bold text-gray-600 dark:text-gray-400">Avg. Clouds (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {dailyData.map((day, idx) => (
                <tr key={day.date} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 font-bold text-ghibli-navy dark:text-ghibli-sky">{day.date}</td>
                  <td className="py-4 text-gray-700 dark:text-gray-300">{day.avgPotential}</td>
                  <td className="py-4 text-gray-700 dark:text-gray-300 font-semibold">{day.maxPotential}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      day.avgCloudCover < 30 ? 'bg-yellow-100 text-yellow-800' : 
                      day.avgCloudCover < 70 ? 'bg-gray-100 text-gray-800' : 
                      'bg-slate-200 text-slate-800'
                    }`}>
                      {day.avgCloudCover}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ResultsCard;