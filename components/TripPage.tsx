"use client";

import { IconClock } from "@tabler/icons-react";
import { IconToolsKitchen2 } from "@tabler/icons-react";
import { IconBulb } from "@tabler/icons-react";
import { IconRoute } from "@tabler/icons-react";

import type {
  Activity,
  TripDay,
  TripItinerary,
} from "@/types/trip";

import useTripStore from "@/store/useTripStore";
import PlaceInfo from "@/components/PlaceInfo";
import { motion } from "motion/react";
import DownloadPDF from "./DownloadPDF";
import { TypingEffect } from "./TypingEffect";

const TripPage = () => {
  const { itinerary } = useTripStore() as {
    itinerary: TripItinerary | null;
  };

  if (!itinerary) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>No itinerary found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-2 py-5 tracking-tight text-black">

      {/* SUMMARY */}

      <div className="my-5 flex flex-col gap-2 text-[#F56551]">
        <TypingEffect
          text={`Summary: ${itinerary.destination}`}
        />

        <p className="w-3/4 text-xl text-neutral-800">
          {itinerary.summary}
        </p>
      </div>

      {/* ITINERARY */}

      <div className="flex flex-col gap-6 text-neutral-900">

        {itinerary.itinerary.map(
          (trip: TripDay, idx: number) => (
            <div
              className="border-y p-4"
              key={idx}
            >
              <h2 className="mb-4 text-xl font-bold">
                <span>Day {trip.day}:</span>{" "}
                {trip.title}
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {trip.activities.map(
                  (
                    activity: Activity,
                    activityIdx: number
                  ) => (
                    <motion.div
                      initial={{
                        y: 80,
                        opacity: 0,
                      }}
                      whileInView={{
                        y: 0,
                        opacity: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: 0.3 * activityIdx,
                        ease: "easeOut",
                        duration: 0.4,
                      }}
                      className="rounded-xl border p-4"
                      key={activityIdx}
                    >

                      {/* ACTIVITY */}

                      <p className="flex items-center gap-1 text-lg">
                        <IconClock stroke={2} />

                        <span className="font-bold">
                          {activity.time}
                        </span>
                      </p>

                      <h3 className="text-xl font-bold text-[#F56551]">
                        {activity.activity}
                      </h3>

                      <p className="my-1 text-md text-neutral-900">
                        <strong>- </strong>
                        {activity.description}
                      </p>

                      <p className="my-1 text-md text-neutral-600">
                        Estimated Cost:{" "}
                        {activity.estimatedCost} ₹
                      </p>

                      {/* GOOGLE PLACE */}

                      <PlaceInfo
                        placeName={
                          activity.placeName
                            ? `${activity.placeName}, ${itinerary.destination}`
                            : `${activity.activity}, ${itinerary.destination}`
                        }
                      />

                    </motion.div>
                  )
                )}

              </div>
            </div>
          )
        )}

        {/* FOOD */}

        <div className="border-t p-4">

          <div className="flex items-center gap-1 font-bold text-[#EF6905]">

            <IconToolsKitchen2 stroke={2} />

            <h3 className="text-3xl">
              Foods to try
            </h3>

          </div>

          <p className="text-lg text-neutral-400">
            Our Food Recommendations
          </p>

          <div className="p-2">

            {itinerary.foodRecommendations.map(
              (food: string, idx: number) => (
                <div
                  key={idx}
                  className="p-2 text-lg font-bold text-[#1B211A]"
                >
                  <p>{food}</p>
                </div>
              )
            )}

          </div>
        </div>

        {/* TRIP SUMMARY */}

        <div className="border-y p-4">

          <div className="flex items-center gap-1 text-3xl font-bold text-[#EF6905]">

            <IconRoute stroke={2} />

            <h3>
              Trip Summary
            </h3>

          </div>

          <h4 className="p-2 text-neutral-500">
            {itinerary.summary}
          </h4>

          {/* TRAVEL TIPS */}

          <div>

            <h5 className="flex items-center gap-1 text-2xl font-bold">

              <IconBulb stroke={2} />

              Travelling Tips

            </h5>

            <ol className="flex list-inside list-disc flex-col gap-1 space-y-2 p-2 pl-4 text-neutral-800">

              {itinerary.travelTips.map(
                (tip: string, idx: number) => (
                  <li key={idx}>
                    {tip}
                  </li>
                )
              )}

            </ol>

          </div>

          {/* TOTAL BUDGET */}

          <div className="flex items-center gap-1 text-2xl font-bold text-[#31241F]">

            <h3>
              Total Budget:
            </h3>

            <h4>
              {itinerary.totalBudget}{" "}
              {itinerary.currency}
            </h4>

          </div>

        </div>

      </div>

      {/* DOWNLOAD */}

      <div className="no-print mx-auto w-full p-4">
        <DownloadPDF />
      </div>

    </main>
  );
};

export default TripPage;