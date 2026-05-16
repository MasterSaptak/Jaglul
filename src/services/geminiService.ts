import { GoogleGenAI } from "@google/genai";

// This service simulates how an Admin might use AI to draft content.
// In a real app, this would be behind a backend proxy.

const API_KEY = process.env.API_KEY || ''; 

export const generateNewsSummary = async (topic: string): Promise<string> => {
  if (!API_KEY) {
    console.warn("Gemini API Key not found");
    return "Mock summary: AI generation unavailable without API key.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, authoritative 2-sentence summary for a political news post about: ${topic}. Tone: Professional, Leadership-oriented.`,
    });
    
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content.";
  }
};
