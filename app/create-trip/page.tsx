"use client"

import TripForm from "@/components/TripForm";
import React from "react";
import { motion } from "motion/react";
const page = () => {
  return (
    <div className="bg-neutral-100 min-h-screen w-full">
      <main className="w-1/2 mx-auto my-10 text-neutral-900 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <motion.h2
           initial={{
            y: 20,
            opacity: 0,
            filter: "blur(10px)",
          }}
          viewport={{once:true}}
          whileInView={{
            y: 0,
            opacity: 1,
            filter: "blur(0)",
          }}
          transition={{
             ease: "easeOut",
            duration: 0.4,
          }}
          className="text-5xl font-bold tracking-tight">
            Tell us your travel preferences
          </motion.h2>
          <motion.p
           initial={{
            y: 20,
            opacity: 0,
            filter: "blur(100px)",
          }}
          viewport={{once:true}}
          whileInView={{
            y: 0,
            opacity: 1,
            filter: "blur(0)",
          }}
          transition={{
            delay: 0.2,
            duration: 0.6,
             ease: "easeOut"
          }}
          className="text-neutral-500 tracking-tight text-lg">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
          </motion.p>
        </div>
        <TripForm />
      </main>
    </div>
  );
};

export default page;
