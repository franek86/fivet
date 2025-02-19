import { z } from "zod";

export const createShipSchema = z.object({
  shipName: z.string().min(1, { message: "Ship name is required" }),
  imoNumber: z
    .string()
    .min(1, { message: "IMO number is required" })
    .regex(/^\d+$/, { message: "IMO number must be a valid number" })
    .transform((val) => parseInt(val, 10)),
  shipType: z.string().min(1, "Ship type is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => /^\d+$/.test(val), { message: "Price must be a whole number without dots or commas" })
    .transform((val) => Number(val)),
  location: z.string().min(1, "Location is required"),
  mainEngine: z.string().min(1, "Main engine is required"),
  lengthOverall: z.string().min(1, "Length overall is required"),
  beam: z.string().min(1, "Beam is required"),
  depth: z.string().min(1, "Depth is required"),
  draft: z.string().min(1, "Draft is required"),
  tonnage: z.string().min(1, "Tonnage is required"),
  cargoCapacity: z.string().min(1, "Cargo capacity is required"),
  buildYear: z.date().optional(),
  buildCountry: z.string().optional(),
  refitYear: z.date().optional(),
  remarks: z.string().optional(),
  description: z.string().optional(),
  mainImage: z
    .instanceof(File, { message: "An image file is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should not exceed 5MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});

export const editShipSchema = z.object({
  shipName: z.string().optional(),
  imoNumber: z
    .string()
    .regex(/^\d+$/, { message: "IMO number must be a valid number" })
    .transform((val) => parseInt(val, 10))
    .optional(),
  shipType: z.string().optional(),
  price: z
    .string()
    .refine((val) => /^\d+$/.test(val), { message: "Price must be a whole number without dots or commas" })
    .transform((val) => Number(val))
    .optional(),
  location: z.string().optional(),
  mainEngine: z.string().optional(),
  lengthOverall: z.string().optional(),
  beam: z.string().optional(),
  depth: z.string().optional(),
  draft: z.string().optional(),
  tonnage: z.string().optional(),
  cargoCapacity: z.string().optional(),
  buildYear: z
    .string()
    .optional()
    .refine((value) => !value || !isNaN(Date.parse(value)), "Invalid date format"),
  buildCountry: z.string().optional(),
  refitYear: z
    .string()
    .optional()
    .refine((value) => !value || !isNaN(Date.parse(value)), "Invalid date format"),
  remarks: z.string().optional(),
  description: z.string().optional(),
  mainImage: z.union([z.instanceof(File), z.string().url("Must be a valid image URL")]).refine((value) => {
    if (typeof value === "string") return true;
    return value instanceof File && value.type.startsWith("image/");
  }, "Main image must be a valid image file or URL"),
  /*  mainImage: z
    .instanceof(File, { message: "mainImage must be a valid image file" })
    .optional()
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should not exceed 5MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }), */
});

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  description: z.string().optional(),
});
