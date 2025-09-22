
import { z } from "zod";
// Reusable date preprocessing helper
const dateSchema = z.preprocess(
  (arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  },
  z.date()
);

// -------------------- Sign (Product) --------------------


export const SIGN_CATEGORY = {
  WORK: 'work',
  EAT: 'eat',
  SLEEP: 'sleep',
  PREMIUM: 'premium',
}

export const SIGN_COMPANY = {
  STANDARD: 'ikea',
  FRIEND: 'liddy',
  COMPETITOR: 'marcos',
  HAMORIA: 'hamoria',
}

export const signInputSchema = z.object({
  id: z.string().optional(), // MongoDB ObjectId as string

  title: z.string()
    .trim()
    .min(1, { message: "Please provide product name" })
    .max(100, { message: "Name cannot be more than 100 characters" }),

  price: z.number()
    .nonnegative()
    .default(0),

  description: z.string()
    .min(1, { message: "Please provide product description" })
    .max(1000, { message: "Description cannot be more than 1000 characters" }),

  image: z.string().default("/uploads/example.jpeg"),

  imagePublicId: z.string().optional(),

  category: z.enum(SIGN_CATEGORY, { message: "Please provide product category" }),

  company: z.enum(SIGN_COMPANY, { message: "Please provide company" }),

  colors: z.array(z.string()).nonempty(), // hex codes or named colors

  featured: z.boolean().default(false),

  freeShipping: z.boolean().default(false),

});