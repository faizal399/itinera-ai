import { create } from "zustand";

const useTripStore = create((set) => ({
  destination: "",

  budget: "",
  travelers: 1,
  interests: "",
  foodPreferences: "",
  travelStyle: "",
  startDate: "",
  endDate: "",
  loading: false,
  itinerary: null,
  error: null,
  setDestination: (destination) => set({ destination }),

  setBudget: (budget) => set({ budget }),
  setTravelers: (travelers) => set({ travelers }),
  setInterests: (interests) => set({ interests }),
  setFoodPreferences: (foodPrefrences) => set({ foodPrefrences }),
  setTravelStyle: (travelStyle) => set({ travelStyle }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setLoading: (loading) => set({ loading }),
  setItinerary: (itinerary) => set({ itinerary }),
  setError: (error) => set({ error }),
  resetTrip: () =>
    set({
      destination: "",
      budget: "",
      travelers: 1,
      interests: "",
      foodPrefrences: "",
      travelStyle: "",
      startDate:"",
      endDate: "",
      loading: false,
      itinerary: null,
      error: null,
    }),
}));

export default useTripStore;
