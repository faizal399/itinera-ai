import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { place } = await req.json();

   

    if (!place) {
      return NextResponse.json(
        { error: "Place is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Google API key missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.photos,places.googleMapsUri",
        },
        body: JSON.stringify({
          textQuery: place,
          maxResultCount: 1,
        }),
      }
    );

    const data = await response.json();

    
    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Google Places error",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      place: data.places?.[0] ?? null,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}