import { z } from "zod";

const imageUrlSchema = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal(""));

export const createJobSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10),
  location: z.string().min(2),
  salary: z.union([z.string().min(1), z.number()]).transform((v) => String(v)),
  company: z.string().min(2),
  period: z.string().min(2),
  contract: z.string().min(2),
  requirements: z.array(z.string()).min(1, "At least one requirement"),
  imageUrl: imageUrlSchema.default(""),
  isArchived: z.boolean().optional(),
});
export const updateJobSchema = createJobSchema.partial();
