"use client";
import Image from "next/image";
import { motion } from "motion/react";
import useTripStore from "../store/useTripStore";
import { tripSchema } from "@/lib/tripSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { IconLoader } from "@tabler/icons-react";
import LabelText from "./LabelText";
const TripForm = () => {
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );
  const {
    destination,
    setDestination,
    resetTrip,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    budget,
    setBudget,
    travelers,
    setTravelers,
    interests,
    setInterests,
    travelStyle,
    setTravelStyle,
    foodPreferences,
    setFoodPreferences,
    setLoading,

    setItinerary,
    loading,
  } = useTripStore();

  const router = useRouter();

  const interestsActivity = [
    {
      id: "beaches",
      name: "Beaches",
    },
    {
      id: "city-sightseeing",
      name: "City sightseeing",
    },
    {
      id: "outdoor-adventures",
      name: "Outdoor adventures",
    },
    {
      id: "festivals-events",
      name: "Festivals/events",
    },
    {
      id: "food-exploration",
      name: "Food exploration",
    },
    {
      id: "nightlife",
      name: "Nightlife",
    },
    {
      id: "shopping",
      name: "Shopping",
    },
    {
      id: "spa-wellness",
      name: "Spa wellness",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tripData = {
      destination,
      startDate,
      endDate,
      budget,
      travelers,
      travelStyle,
      interests,
      foodPreferences,
    };

    const result = tripSchema.safeParse(tripData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});

    // console.log("Valid: ", result.data);

    try {
      setLoading(true);

      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);
        throw new Error(data.error || "Failed to generate trip");
      }

      
      setItinerary(data);

      router.push("/trip");

    } catch (error) {
      console.error("Trip Generation Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col gap-2">
          <LabelText>What is destination of choice?</LabelText>
          {errors.destination && (
            <p className="text-red-500 text-sm">{errors.destination[0]}</p>
          )}
          <motion.input
              initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{once:true}}
            transition={{
              delay: 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="text-2xl outline-none focus:shadow-gray-500 shadow-md  border border-neutral-400 px-2 rounded py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="text"
            placeholder="New Work"
          />
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <LabelText>When are you planning to travel?</LabelText>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate[0]}</p>
            )}
            <motion.input
              initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{once:true}}
            transition={{
              delay: 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-2xl outline-none focus:shadow-gray-500 shadow-md  border border-neutral-400 px-2 rounded py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="date"
            />
          </div>
          <div className="flex flex-col gap-2">
            <LabelText >
              When are you planning to End trip?
            </LabelText>
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate[0]}</p>
            )}
            <motion.input
             initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{once:true}}
            transition={{
              delay: 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-2xl outline-none focus:shadow-gray-500 shadow-md  border border-neutral-400 px-2 rounded py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="date"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-bold">
            Who do you plan on traveling with on your next adventure?
          </label>
          {errors.travelers && (
            <p className="text-red-500 text-sm">{errors.travelers[0]}</p>
          )}
          <motion.input
             initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{once:true}}
            transition={{
              delay: 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="text-2xl outline-none focus:shadow-gray-500 shadow-md  border border-neutral-400 px-2 rounded py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            placeholder="2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <LabelText >What is Your Budget?</LabelText>
          {errors.budget && (
            <p className="text-red-500 text-sm">{errors.budget[0]}</p>
          )}
          <div className="flex text-center justify-between items-center gap-5 p-2">
            <div
              className={` h-full  w-full flex flex-col justify-center cursor-pointer items-center  rounded-md ${budget === "budget" ? "border-2 border-black  shadow-md bg-gray-50" : "border border-neutral-300 hover:border-gray-800"}`}
              onClick={() => setBudget("budget")}
            >
              {/* budget */}
              <Image
                src={"/budget-svg/budget.svg"}
                alt="budget"
                width={0}
                height={0}
                className="w-18"
              />
              <p className="p-2 tracking-tight font-bold">
                Low Budget: 1$ - 1000$ USD
              </p>
            </div>
            <div
              className={` h-full  w-full flex flex-col justify-center items-center  cursor-pointer rounded-md ${budget === "moderate" ? "border-2 border-black shadow-md bg-gray-50" : "border border-neutral-300 hover:border-gray-800"}`}
              onClick={() => setBudget("moderate")}
            >
              {/* moderate */}
              <Image
                src={"/budget-svg/moderate.svg"}
                alt="budget"
                width={0}
                height={0}
                className="w-18"
              />
              <p className="p-2 tracking-tight font-bold">
                Moderate Budget: 1000$ - 2500$ USD
              </p>
            </div>
            <div
              className={` h-full  w-full flex flex-col justify-center cursor-pointer items-center  rounded-md ${budget === "luxury" ? "border-2 border-black shadow-md bg-gray-50" : "border border-neutral-300 hover:border-gray-800"}`}
              onClick={() => setBudget("luxury")}
            >
              {/* luxury */}
              <Image
                src={"/budget-svg/luxury.svg"}
                alt="budget"
                width={0}
                height={0}
                className="w-18"
              />
              <p className="p-2 tracking-tight font-bold">
                Luxury Budget: 2500$+ USD
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <LabelText >
            Which activities are you interested in?
          </LabelText>
          {errors.interests && (
            <p className="text-red-500 text-sm">{errors.interests[0]}</p>
          )}
          <div className="flex flex-wrap  items-center gap-2 p-2">
            {interestsActivity.map((int, idx) => (
              <motion.div
                initial={{
                  y: 20,
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  filter: "blur(0)",
                }}
                transition={{
                  delay: 0.2 * idx,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                key={idx}
                onClick={() => setInterests(int.name)}
                className={`  w-fit  justify-center cursor-pointer items-center  rounded-md 
                    
                    border text-center px-2 py-1 text-nowrap
                    ${interests === int.name ? "border-2 border-black bg-gray-50" : "border border-neutral-300 hover:border-gray-800"}
                    `}
              >
                <p>{int.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <LabelText>Food Preferences?</LabelText>
          {errors.foodPreferences && (
            <p className="text-red-500 text-sm">{errors.foodPreferences[0]}</p>
          )}
          <motion.input
             initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{once:true}}
            transition={{
              delay: 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
            value={foodPreferences}
            onChange={(e) => setFoodPreferences(e.target.value)}
            className="text-2xl outline-none focus:shadow-gray-500 shadow-md  border border-neutral-400 px-2 rounded py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="text"
            placeholder="E.g. Non-veg biryani, chicken tikka."
          />
        </div>
        <div className="flex flex-col gap-2">
          <LabelText>Travel Style?</LabelText>
          {errors.travelStyle && (
            <p className="text-red-500 text-sm">{errors.travelStyle[0]}</p>
          )}
          <motion.select
             initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{once:true}}
            transition={{
              delay: 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            className="w-full rounded-lg shadow focus:shadow-gray-500 border p-3"
          >
            <option value="">Select travel style</option>
            <option value="relaxed">Relaxed</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="luxury">Luxury</option>
            <option value="budget">Budget</option>
          </motion.select>
        </div>

        <motion.button
           initial={{
              y: 20,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{once:true}}
            transition={{
              delay: 0.4,
              duration: 0.4,
              ease: "easeOut",
            }}
          disabled={loading}
          type="submit"
          className={`w-full  mx-auto  cursor-pointer  duration-300 rounded-lg bg-black px-5 py-3 text-white flex justify-center items-center `}
        >
          {loading === true ? (
            <span className="flex gap-2">
              <IconLoader stroke={2} className="animate-spin " />
              <p className="animate-pulse">Generating Trip...</p>
            </span>
          ) : (
            "Generate My Trip"
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default TripForm;
