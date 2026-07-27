import { z } from "zod";

// Product Image schema
const ProductImageSchema = z.object({
  id: z.string(),
  by_name: z.string(),
  by_url: z.string().url(),
  source_name: z.string(),
  source_url: z.string().url(),
  file_name: z.string(),
  title: z.string(),
});

// Category schema
const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

// Brand schema
const BrandSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// Product schema
const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  is_location_offer: z.boolean(),
  is_rental: z.boolean(),
  co2_rating: z.string(), // could refine to enum: z.enum(["A","B","C","D","E"])
  in_stock: z.number(),
  is_eco_friendly: z.boolean(),
  product_image: ProductImageSchema,
  category: CategorySchema,
  brand: BrandSchema,
});

// Root schema for the uploaded JSON
export const ProductListSchema = z.object({
  current_page: z.number(),
  data: z.array(ProductSchema),
  from: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  to: z.number(),
  total: z.number(),
});
