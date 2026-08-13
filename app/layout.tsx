import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Itinera.AI | AI-Powered Trip Planner",
  description:
    "Create personalized travel itineraries with Itinera.AI. Plan trips based on your destination, budget, interests, travelers, and preferences with AI-powered recommendations and real-world place information.",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <ClerkProvider>
        <body className="min-h-full flex flex-col ">
          <Navbar />
          {children}
          <Footer/>
        </body>
      </ClerkProvider>
    </html>
  );
}
