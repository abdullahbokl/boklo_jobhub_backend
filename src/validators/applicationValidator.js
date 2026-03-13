import { z } from "zod";
import { applicationStatuses } from "../utils/applicationStatus.js";

export const applyJobSchema = z.object({
  coverLetter: z.string().max(2000, "Cover letter too long").optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(applicationStatuses, {
    errorMap: () => ({ message: "Status must be applied, under_review, interview, accepted, or rejected" }),
  }),
});

export const sendMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(2000, "Message too long"),
  chatId: z.string().min(1, "chatId is required"),
  receiverId: z.string().min(1, "receiverId is required"),
});
