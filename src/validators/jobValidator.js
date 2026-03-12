import { z } from "zod";
export const createJobSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10),
  location: z.string().min(2),
  salary: z.string().min(1),
  company: z.string().min(2),
  period: z.string().min(2),
  contract: z.string().min(2),
  requirements: z.array(z.string()).min(1, "At least one requirement"),
  imageUrl: z.string().url("Must be a valid URL"),
});
export const updateJobSchema = createJobSchema.partial();
