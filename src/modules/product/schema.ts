import { z } from "zod";
import { Types } from "mongoose";

export const productSchema = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number(),
});

export const productQuerySchema = z.object({
  search: z.string().optional().default(""),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export const productParamSchema = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
});
