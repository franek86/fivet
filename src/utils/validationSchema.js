import { z } from "zod";

export const createShipSchema = z.object({
  shipName: z.string().min(1, { message: "Ship name is required" }),
  imoNumber: z
    .string()
    .min(1, { message: "IMO number is required" })
    .regex(/^\d+$/, { message: "IMO number must be a valid number" })
    .transform((val) => parseInt(val, 10)),
  /* shipType: z.string().min(1, { message: "Ship type is required" }), */
  shipType: z
    .string()
    .min(1, { message: "Ship type is required" }) // Ensure it's selected
    .refine((val) => !isNaN(parseInt(val, 10)), { message: "Invalid ship type" }) // Ensure it's a number
    .transform((val) => parseInt(val, 10)), // Convert string to number
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d{1,3}(,\d{3})*(\.\d{1,2})?$/, "Price must be a valid currency format (e.g., 2,038.28)")
    .transform((val) => parseFloat(val.replace(/,/g, ""))),
  location: z.string().optional(),
  mainEngine: z.string().optional(),
  lengthOverall: z.string().optional(),
  beam: z.string().optional(),
  depth: z.string().optional(),
  draft: z.string().optional(),
  tonnage: z.string().optional(),
  cargoCapacity: z.string().optional(),
  buildYear: z.date().optional(),
  buildCountry: z.string().optional(),
  refitYear: z.date().optional(),
  remarks: z.string().optional(),
  description: z.string().optional(),
  mainImage: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should not exceed 5MB",
    })
    .refine((file) => file.type.startsWith("image/"))
    .optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  description: z.string().optional(),
});
