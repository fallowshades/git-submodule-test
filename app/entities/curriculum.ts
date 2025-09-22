
import { z } from "zod";
// Reusable date preprocessing helper
const dateSchema = z.preprocess(
  (arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  },
  z.date()
);

// -------------------- Curriculum --------------------
export const curriculumSchema = z.object({
  id: z.string().optional(), // MongoDB ObjectId as string
  title: z.string(),
  description: z.string(),
  courses: z.array(z.string()), // Array of ObjectId strings
  order: z.number(),
  created_at: dateSchema,
  updated_at: dateSchema,
});

// -------------------- Curriculum --------------------
export const curriculumInputSchema = z.object({
  id: z.string().optional(), // MongoDB ObjectId as string
  title: z.string(),
  description: z.string(),
  courses: z.array(z.string()), // Array of ObjectId strings
  order: z.number(),
});


export type Type = z.infer<typeof curriculumSchema>;
export type InputType = z.infer<typeof curriculumInputSchema>;

