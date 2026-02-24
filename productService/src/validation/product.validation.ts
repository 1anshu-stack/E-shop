import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    categoryId: z.string().uuid(),
  }),
});



export const getProductsQuerySchema = z.object({
  query: z.object({
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 10))
      .refine((val) => val > 0 && val <= 50, {
        message: "Limit must be between 1 and 50"
      }),
    cursor: z.string().uuid().optional(),
    categoryId: z.string().uuid().optional(),

    minPrice: z
      .string()
      .optional()
      .transform(val => (val ? parseFloat(val) : undefined)),

    maxPrice: z
      .string()
      .optional()
      .transform(val => (val ? parseFloat(val) : undefined)),

    inStock: z
      .string()
      .optional()
      .transform(val => val === "true")
  }),
})