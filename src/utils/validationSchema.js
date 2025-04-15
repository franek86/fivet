import { z } from "zod";

export const floatValidation = {
  required: "This field is required",
  validate: (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "Must be a valid number";
    if (num <= 0) return "Must be a positive number";
    return true;
  },
};

export const imageValidation = {
  required: "Image is required",
  validate: {
    isFile: (files) => (files && files.length > 0 && files[0] instanceof File) || "Must be a valid file",
    isImage: (files) => (files && files[0]?.type.startsWith("image/")) || "Must be an image file",
  },
};

export const yearValidation = {
  pattern: {
    value: /^\d{1,4}$/,
    message: "Year must be a number with up to 4 digits",
  },
  validate: (value) => {
    if (!value) return true;
    const year = parseInt(value, 10);
    if (isNaN(year)) return "Year must be a number";
    if (year < 1000) return "Year must be at least 1000";
    if (year > new Date().getFullYear()) return "Year can't be in the future";
    return true;
  },
};

// edit ship form schema
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
});

// category form schema
export const createCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  description: z.string().optional(),
});

// Log in form schema
export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
