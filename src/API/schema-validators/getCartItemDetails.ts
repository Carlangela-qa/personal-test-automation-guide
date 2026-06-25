import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  is_location_offer: z.boolean(),
  is_rental: z.boolean(),
  co2_rating: z.string(),
  in_stock: z.number(),
  is_eco_friendly: z.boolean(),
});

export const CartItemSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  discount_percentage: z.number().nullable(),
  cart_id: z.string(),
  product_id: z.string(),
  product: ProductSchema,
});

export const CartSchema = z.object({
  id: z.string(),
  additional_discount_percentage: z.number().nullable(),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
  cart_items: z.array(CartItemSchema),
});

// Infer TS type for convenience
export type CartResponse = z.infer<typeof CartSchema>;