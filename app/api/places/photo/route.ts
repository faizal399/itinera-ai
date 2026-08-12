import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const photoName = searchParams.get("name");

   
    if (!photoName) {
      return new NextResponse("Photo name is missing", {
        status: 400,
      });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return new NextResponse("API key is missing", {
        status: 500,
      });
    }

    const googleUrl =
      `https://places.googleapis.com/v1/${photoName}/media` +
      `?maxWidthPx=1000&key=${apiKey}`;

    

    const response = await fetch(googleUrl);

   

    if (!response.ok) {
      const error = await response.text();

      console.error(
        "Google photo error:",
        error
      );

      return new NextResponse(error, {
        status: response.status,
      });
    }

    const image = await response.arrayBuffer();

    return new NextResponse(image, {
      status: 200,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "image/jpeg",

        "Cache-Control":
          "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error(
      "PHOTO ROUTE ERROR:",
      error
    );

    return new NextResponse(
      "Failed to load photo",
      {
        status: 500,
      }
    );
  }
}