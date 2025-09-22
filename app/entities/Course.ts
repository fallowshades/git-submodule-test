

import { z } from "zod";
// Reusable date preprocessing helper
const dateSchema = z.preprocess(
  (arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  },
  z.date()
);


// -------------------- Input --------------------

// -------------------- Course --------------------
export const courseInputSchema = z.object({
  id: z.string().optional(), // MongoDB ObjectId string
  title: z.string(),
  description: z.array(z.string()).nonempty(), // Multiple paragraphs allowed
  duration: z.number(), // Duration in minutes/hours
  subsections: z.array(z.string()).nonempty(), // Could reference subsection IDs

});
