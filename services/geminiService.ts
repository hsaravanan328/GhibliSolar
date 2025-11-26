import { GoogleGenAI } from "@google/genai";
import { DailySummary, LocationInfo } from '../types';

export const generateReport = async (
  location: LocationInfo, 
  summary: DailySummary[]
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Please configure your API Key to receive the Spirit's report.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const summaryText = summary.map(d => 
    `Date: ${d.date}, Max Potential: ${d.maxPotential}kW, Avg Cloud Cover: ${d.avgCloudCover}%`
  ).join('\n');

  const prompt = `
    You are a Reporting Agent with the soul of a Studio Ghibli storyteller. 
    The user is asking for a solar power forecast for: ${location.name}.
    
    Here is the data for the next 3 days:
    ${summaryText}

    Write a short, whimsical, and comforting report (approx 100-150 words).
    Use metaphors related to nature, wind, spirits, sun, and clouds.
    Explain if it's a good time for solar energy, but do it gently.
    If it's cloudy, describe the clouds as fluffy friends or mysterious blankets.
    If it's sunny, describe the sun's warm embrace.
    
    Format the response in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "The spirits are silent today...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The wind spirits interfered with the message (Error fetching report).";
  }
};