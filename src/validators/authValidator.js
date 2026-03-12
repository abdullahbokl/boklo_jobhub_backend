import { z } from "zod";
export const registerSchema = z.object({
  userName: z.string().min(3).max(30).regex(/^\w+$/, "Username must be alphanumeric"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export const loginSchema = z.object({
  email: z.string().email().optional(),
  userName: z.string().min(3).optional(),
  password: z.string().min(1, "Password is required"),
}).refine((d) => d.email || d.userName, { message: "Email or username required" });
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token required"),
});
