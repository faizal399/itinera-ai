import TripForm from "@/components/TripForm";
import React from "react";

const page = () => {
  return (
    <div className="bg-neutral-100 min-h-screen w-full">
      <main className="w-1/2 mx-auto my-10 text-neutral-900 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          
          <h2 className="text-5xl font-bold tracking-tight">
            Tell us your travel preferences
          </h2>
          <p className="text-neutral-500 tracking-tight text-lg">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
          </p>
        </div>
        <TripForm/>
      </main>
    </div>
  );
};

export default page;
