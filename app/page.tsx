"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const page = () => {
  const destinations = [
    {
      name: "Agra",
      image: "/trips-images/agra.jpeg",
      bestFor: "History & Architecture",
    },
    {
      name: "Kashmir",
      image: "/trips-images/kashmir.jpeg",
      bestFor: "Mountains & Nature",
    },
    {
      name: "Goa",
      image: "/trips-images/goa.jpeg",
      bestFor: "Beaches & Nightlife",
    },
    {
      name: "Dubai",
      image: "/trips-images/dubai.jpeg",
      bestFor: "Luxury & Shopping",
    },
    {
      name: "Jaipur",
      image: "/trips-images/jaipur.jpeg",
      bestFor: "Culture & Heritage",
    },
    {
      name: "Manali",
      image: "/trips-images/manali.jpeg",
      bestFor: "Adventure & Mountains",
    },
    {
      name: "Rome",
      image: "/trips-images/rome.jpeg",
      bestFor: "History & Food",
    },
    {
      name: "Singapore",
      image: "/trips-images/singapore.jpeg",
      bestFor: "City & Family Travel",
    },
  ];

  const [active, setActive] = useState(null);

  return (
    <div className="flex flex-col bg-neutral-100  min-h-screen w-full">
      <div className="w-2/3 mx-auto select-none py-4">
        <div className="flex h-100 gap-3">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              className={`transition-all duration-500 overflow-hidden rounded-2xl cursor-pointer relative ${active === idx ? "flex-3" : "flex-1"}`}
            >
              <Image
                className="h-full w-full object-cover"
                src={dest.image}
                loading="eager"
                alt="natural images"
                width={500}
                height={200}
              />
              {active === idx && (
                <div className={`"text-black absolute  top-[80%]  backdrop-blur-xs p-2 h-full w-full transition-all duration-900 overflow-hidden" ${active===idx? "opacity-100 ":"opacity-0"}`}>
                  <h2 className="text-2xl font-black text-neutral-200">
                    {dest.name}
                  </h2>
                  <p className="text-neutral-400">{dest.bestFor}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <main className="h-full flex flex-col justify-center items-center w-full text-center gap-5">
        <div>
          <p className="text-8xl font-bold text-[#18181B] tracking-tight text-wrap  ">
            Craft Unforgettable
          </p>
          <p className="text-8xl font-bold text-[#18181B] tracking-tight text-wrap">
            Itineraries with
          </p>
        </div>
        <h1 className="text-8xl tracking-tight font-bold text-[#F56551]">
          ITINERA.AI
        </h1>
        <p className="text-taupe-600 text-xl w-1/2 font-mono">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <div>
         <Link href={"/create-trip"}>
          <button className="bg-neutral-950 px-2 py-1 rounded text-xl cursor-pointer hover:bg-neutral-800 hover:shadow-black shadow-md focus:shadow-none duration-300">
            Get started
          </button>
         </Link>
        </div>
        <div className="bg-neutral-900 mx-auto w-1/2  rounded-md my-10 p-5 flex flex-col justify-center items-center gap-4">
          <p className="text-4xl tracking-tight font-bold">
            Skip the manual trip planning and start your effortless journey with
            Trip Planner AI today, at no cost.
          </p>
          <button className="bg-neutral-100 text-neutral-900 px-4 py-1 rounded  cursor-pointer text-2xl">
            Try Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default page;
