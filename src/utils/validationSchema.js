import { z } from "zod";
const StatusEnum = z.enum(["REGULAR", "IMPORTANT"]);
const stringToFloat = (fieldName) =>
  z
    .string()
    .min(1, `${fieldName} is required`)
    .refine((val) => /^-?\d+(\.\d+)?$/.test(val), {
      message: `${fieldName} must be a valid number`,
    })
    .transform((val) => parseFloat(val));

const optionalInt = (fieldName) =>
  z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || /^\d{1,4}$/.test(val), {
      message: `${fieldName} must be a whole number`,
    })
    .transform((val) => (val ? parseInt(val) : undefined));

export const createShipSchema = z.object({
  shipName: z.string().min(1, { message: "Ship name is required" }),
  imo: z.string().min(1, { message: "IMO number is required" }),
  typeId: z.string().uuid().min(1, "Ship type is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => /^\d+$/.test(val), { message: "Price must be a whole number without dots or commas" })
    .transform((val) => Number(val)),
  location: z.string().min(1, "Location is required"),
  mainEngine: z.string().min(1, "Main engine is required"),
  lengthOverall: z.string().optional(),
  length: stringToFloat("Length"),
  beam: stringToFloat("Beam"),
  depth: stringToFloat("Depth"),
  draft: stringToFloat("Draft"),
  tonnage: stringToFloat("Tonnage"),
  cargoCapacity: z.string().min(1, "Cargo capacity is required"),
  buildYear: optionalInt("Build year"),
  buildCountry: z.string().optional(),
  refitYear: optionalInt("Refit year"),
  remarks: z.string().optional(),
  description: z.string().optional(),
  userId: z.string().uuid(),
  mainImage: z
    .instanceof(File, { message: "An image file is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should not exceed 5MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
});

// edit ship form schema
export const editShipSchema = z.object({
  shipName: z.string().optional(),
  imo: z.string().optional(),
  typeId: z.string().optional(),
  price: z.number().int().optional(),
  location: z.string().optional(),
  mainEngine: z.string().optional(),
  lengthOverall: z.string().optional(),
  length: z.coerce.number().optional(),
  beam: z.coerce.number().optional(),
  depth: z.coerce.number().optional(),
  draft: z.coerce.number().optional(),
  tonnage: z.coerce.number().optional(),
  cargoCapacity: z.string().optional(),
  buildYear: optionalInt("Build year"),
  buildCountry: z.string().optional(),
  refitYear: optionalInt("Refit year"),
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

// Address book schema
export const addressBookSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("Invalid email address"),
  fullName: z.string().min(1, "Name is required"),
  phone_number: z.string().optional().nullable(),
  mobile_number: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  address_2: z.string().optional().nullable(),
  web_link: z.string().optional().nullable(),
  linkedin_link: z.string().optional().nullable(),
  facebook_link: z.string().optional().nullable(),
  instagram_link: z.string().optional().nullable(),
  tiktok_link: z.string().optional().nullable(),
  priority: StatusEnum.default("REGULAR"),
  company: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  userId: z.string().uuid(),
});
