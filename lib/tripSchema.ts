import { z } from "zod";

export const tripSchema = z
  .object({
    destination: z.string().min(2, "Please Enter a destination"),

    travelers: z.number().min(1, "At least 1 traveler is required"),
    budget: z.string().min(1, "please select a budget"),
    interests: z.string().min(1, "Please select your interests"),

    foodPreferences: z.string().min(1, "Please select your food preferences"),

    travelStyle: z.string().min(1, "Please select your travel style"),

    startDate: z.string().min(1, "Please select a start date"),

    endDate: z.string().min(1, "Please select an end date"),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });
