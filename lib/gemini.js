import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateTrip(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config:{
        responseMimeType:"application/json",
    }
  });

  return JSON.parse(response.text)
}

