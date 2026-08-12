export interface Activity {
  time: string;
  activity: string;
  description: string;
  estimatedCost: number;
  placeName?: string;
}

export interface TripDay {
  day: number;
  title: string;
  activities: Activity[];
}

export interface TripItinerary {
  destination: string;
  summary: string;
  currency: string;
  totalBudget: number;
  foodRecommendations: string[];
  travelTips: string[];
  itinerary: TripDay[];
}