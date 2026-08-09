import { json } from "node:stream/consumers";
import { generateTrip } from "../../../lib/gemini";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received body:", body);
    const {
      destination,
      budget,
      travelers,
      interests,
      foodPreferences,
      travelStyle,
      startDate,
      endDate,
    } = body;

    const prompt = `
    You are an AI travel planner.

Create a detailed travel itinerary using the following information:

Destination: ${destination}
Budget: ${budget}
Travelers: ${travelers}
Interests: ${interests}
Food Preferences: ${foodPreferences}
Travel Style: ${travelStyle}
Start Date: ${startDate}
End Date: ${endDate}

Return ONLY valid JSON.

The JSON must follow this structure:

{
  "destination": "string",
  "summary": "string",
  "totalBudget": 0,
  "currency": "INR",
  "itinerary": [
    {
      "day": 1,
      "title": "string",
      "activities": [
        {
          "time": "string",
          "activity": "string",
          "description": "string",
          "estimatedCost": 0
        }
      ]
    }
  ],
  "foodRecommendations": [
    "string"
  ],
  "travelTips": [
    "string"
  ]
}
`;

    const trip = await generateTrip(prompt);

    console.log("Gemini response:", trip);

    return Response.json(trip);
  } catch (error) {
    console.error("SERVER ERROR:", error);
    // console.error("Trip Generation Error:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
