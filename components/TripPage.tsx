"use client";
import { IconClock } from "@tabler/icons-react";
import { IconToolsKitchen2 } from "@tabler/icons-react";
import useTripStore from "@/store/useTripStore";
import React, { useEffect, useState } from "react";
import { IconBulb } from "@tabler/icons-react";
import PlaceInfo from "@/components/PlaceInfo";
import { IconRoute } from "@tabler/icons-react";
import { motion } from "motion/react";
import DownloadPDF from "./DownloadPDF";
import { TypingEffect } from "./TypingEffect";

const TripPage = () => {
  const { itinerary } = useTripStore();


  const [placeData, setPlaceData] = useState<Record<string, any>>({});
  const [loadingPlaces, setLoadingPlaces] = useState(true);

  useEffect(() => {
    if (!itinerary?.itinerary) return;

    const fetchPlaces = async () => {
      try {
        // Get all activity names
        const activities = itinerary.itinerary.flatMap(
          (day: any) => day.activities,
        );

        // Remove duplicate activity names
        const uniqueActivities = [
          ...new Set(activities.map((activity: any) => activity.activity)),
        ];

        const results = await Promise.all(
          uniqueActivities.map(async (activityName) => {
            const response = await fetch("/api/places", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                place: `${activityName}, ${itinerary.destination}`,
              }),
            });

            const data = await response.json();

            return {
              activityName,
              place: data.place,
            };
          }),
        );

        const placeMap: Record<string, any> = {};

        results.forEach(({ activityName, place }) => {
          placeMap[activityName] = place;
        });

        setPlaceData(placeMap);
      } catch (error) {
        console.error("Failed to fetch places:", error);
      } finally {
        setLoadingPlaces(false);
      }
    };

    fetchPlaces();
  }, [itinerary]);

  if (!itinerary) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>No itinerary found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full max-w-6xl mx-auto text-black py-5 px-2 tracking-tight">
      {/* SUMMARY */}

      <div className="flex flex-col gap-2 my-5 text-[#F56551]">
        <TypingEffect text={`Summary: ${itinerary.destination}`} />

        <p className="w-3/4 text-xl text-neutral-800">{itinerary.summary}</p>
      </div>

      {/* ITINERARY */}

      <div className="flex flex-col text-neutral-900 gap-6">
        {itinerary.itinerary.map((trip: any, idx: number) => (
          <div className="border-y  p-4" key={idx}>
            <h2 className="text-xl font-bold mb-4">
              <span>Day {trip.day}:</span> {trip.title}
            </h2>

            <div className="grid grid-cols-2  gap-6">
              {trip.activities.map((activity: any, activityIdx: number) => {
                return (
                  <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    viewport={{once:true}}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3 * activityIdx,
                      ease: "easeOut",
                      duration:0.4
                    }}
                    className="border rounded-xl p-4"
                    key={activityIdx}
                  >
                    {/* ACTIVITY */}
                    <p className="text-lg flex gap-1 items-center">
                      <IconClock stroke={2} />
                      <span className="font-bold">{activity.time}</span>{" "}
                    </p>
                    <h3 className="text-xl text-[#F56551] font-bold">
                      {activity.activity}
                    </h3>{" "}
                    <p className="my-1 text-md text-neutral-900">
                      <strong>- </strong>
                      {activity.description}
                    </p>
                    <p className="my-1 text-md text-neutral-600">
                      Estimated Cost: {activity.estimatedCost} ₹
                    </p>
                    {/* GOOGLE PLACE */}
                    {loadingPlaces ? (
                      <div className="mt-4 animate-pulse rounded-xl bg-neutral-100 h-40">
                        <div className="p-4 animate-pulse">
                          Loading place information...
                        </div>
                      </div>
                    ) : (
                      <PlaceInfo
                        placeName={`${activity.activity}, ${itinerary.destination}`}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="border-t p-4 ">
          <div className="flex  items-center text-[#EF6905] gap-1 font-bold">
            <IconToolsKitchen2 stroke={2} />
            <h3 className="text-3xl  ">Foods to try</h3>
          </div>
          <p className="text-lg text-neutral-400">Our Food Recommendations</p>
          <div className="p-2">
            {itinerary.foodRecommendations.map((food, idx) => (
              <div key={idx} className="p-2 text-lg text-[#1B211A] font-bold">
                <p>{food}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-y">
          <div className="flex gap-1 text-3xl text-[#EF6905] gap items-center font-bold">
            <span>
              <IconRoute stroke={2} />{" "}
            </span>{" "}
            <h3>Trip Summary</h3>
          </div>
          <h4 className="p-2 text-neutral-500">{itinerary.summary}</h4>
          <div>
            <h5 className="text-2xl flex items-center gap-1 font-bold">
              <span>
                <IconBulb stroke={2} />
              </span>{" "}
              Travelling Tips
            </h5>
            <ol className="flex flex-col gap-1 text-neutral-800 p-2 list-disc list-inside space-y-2 pl-4">
              {itinerary.travelTips.map((trip, idx) => (
                <li key={idx}>{trip}</li>
              ))}
            </ol>
          </div>

          <div className="text-2xl flex gap-1 items-center text-[#31241F] font-bold ">
            <h3>Total Budget:</h3>
            <h4>
              {itinerary.totalBudget} {itinerary.currency}
            </h4>
          </div>
        </div>
      </div>
      <div className="w-full p-4 mx-auto no-print">
        <DownloadPDF />
      </div>
    </main>
  );
};

export default TripPage;
