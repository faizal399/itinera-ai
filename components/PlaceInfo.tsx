"use client";

import { useEffect, useState } from "react";

interface Place {
  displayName?: {
    text: string;
    languageCode?: string;
  };

  formattedAddress?: string;

  rating?: number;

  userRatingCount?: number;

  googleMapsUri?: string;

  photos?: {
    name: string;
    widthPx?: number;
    heightPx?: number;
    authorAttributions?: {
      displayName?: string;
      uri?: string;
    }[];
  }[];
}

interface PlaceInfoProps {
  placeName: string;
}

export default function PlaceInfo({
  placeName,
}: PlaceInfoProps) {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!placeName) {
      setLoading(false);
      return;
    }

    async function fetchPlace() {
      try {
        const response = await fetch("/api/places", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            place: placeName,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || "Failed to fetch place"
          );
        }

        setPlace(data.place);
      } catch (error) {
        console.error("Place error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlace();
  }, [placeName]);

  if (loading) {
    return (
      <div className="mt-5 h-64 animate-pulse rounded-xl bg-neutral-200" />
    );
  }

  if (!place) {
    return null;
  }

  const photoName = place.photos?.[0]?.name;

  const imageUrl =
    photoName && !imageError
      ? `/api/places/photo?name=${encodeURIComponent(
          photoName
        )}`
      : null;

  return (
    <div className="mt-5 overflow-hidden rounded-xl border bg-white">
      {/* PHOTO */}

      {imageUrl && (
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={
              place.displayName?.text ||
              placeName
            }
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* INFO */}

      <div className="p-4">
        <h4 className="text-xl font-bold">
          {place.displayName?.text}
        </h4>

        {place.rating !== undefined && (
          <p className="mt-2">
            ⭐ {place.rating}

            {place.userRatingCount !== undefined && (
              <span className="ml-2 text-sm text-neutral-500">
                (
                {place.userRatingCount.toLocaleString()}
                {" "}reviews)
              </span>
            )}
          </p>
        )}

        {place.formattedAddress && (
          <p className="mt-2 text-sm text-neutral-600">
            📍 {place.formattedAddress}
          </p>
        )}

        {place.googleMapsUri && (
          <a
            href={place.googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-sm text-white"
          >
            View on Google Maps
          </a>
        )}
      </div>
    </div>
  );
}