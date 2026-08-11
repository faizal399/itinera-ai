import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="no-print  w-6xl mx-auto grid-cols-3 grid gap-10 py-10">
      <div>
        <h4 className="text-3xl font-bold ">About</h4>
        <div className="space-y-2">
          <p>
            Hi, I&apos;m Faizal 👋 I&apos;m a frontend developer and BCA
            graduate passionate about building modern, interactive web
            applications. I enjoy working with React, Next.js, TypeScript,
            Tailwind CSS, and AI technologies.
          </p>
          <p>
            I built this AI Trip Planner to combine my frontend development
            skills with Gemini AI and Google Places to make trip planning faster
            and more personalized.
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-bold ">Connect</h4>
        <ul className="p-2 space-y-2 underline text-xl">
          <li>
            <Link href={"https://faizal-sheikh.vercel.app/"}>Portfolio</Link>
          </li>
          <li>
            <Link href={"linkedin.com/in/faizal-sheikh-187648hu"}>
              LinkedIn
            </Link>
          </li>
          <li>
            <Link href={"https://github.com/faizal399"}>Github</Link>
          </li>
          <li>
            <Link href={"https://x.com/faizy__007"}>X</Link>
          </li>
        </ul>
      </div>
      <div>
       <p className="text-2xl"> Built with ❤️ using Next.js, Gemini AI
and Google Places.</p>
      </div>
    </div>
  );
};

export default Footer;
