import { z } from "zod";

const experienceSchema = z.object({
  title: z.string().optional(),
  company: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const educationSchema = z.object({
  school: z.string().optional(),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const updateUserSchema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500).optional(),
  skills: z.array(z.string()).optional(),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  companyName: z.string().optional(),
  industry: z.string().optional(),
  website: z.string().optional(),
  profilePic: z.string().url().optional(),
  password: z.string().min(8).optional(),
});
