import { create } from "zustand";
import { persist } from "zustand/middleware";
const useTripStore = create(
persist(
    (set) => ({
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
  setFoodPreferences: (foodPreferences) => set({ foodPreferences }),
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
      foodPreferences: "",
      travelStyle: "",
      startDate:"",
      endDate: "",
      loading: true,
      itinerary: null,
      error: null,
    }),
}),{
  name:"trip-storage",
   partialize: (state) => ({
        itinerary: state.itinerary,
      }),
}
)

);

export default useTripStore;
