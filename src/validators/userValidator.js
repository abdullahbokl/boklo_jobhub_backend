import { z } from "zod";
export const updateUserSchema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500).optional(),
  skills: z.array(z.string()).optional(),
  profilePic: z.string().url().optional(),
  password: z.string().min(8).optional(),
});
