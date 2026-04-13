import { z } from "zod";
import moment from "moment";

/**
 * Enums
 */
const addressStatusEnum = z.enum(["REGULAR", "IMPORTANT"]);
const statusEnum = z.enum(["PLANNED", "DONE", "CANCELLED"]);
const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
const blogStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

/**
 * Normalizes different date input types into a native JavaScript Date object.
 * Accepts: Date instance, Moment.js object, ISO date string
 * Returns: Date object if valid, undefined if value is empty or unsupported
 */
const datePreprocess = (arg) => {
  if (!arg) return undefined;
  if (arg instanceof Date) return arg;
  if (moment.isMoment(arg)) return arg.toDate();
  if (typeof arg === "string") return new Date(arg);
  return undefined;
};

/**
 * Converts a comma-separated tag string into an array of trimmed tags.
 * Example: "react, javascript, frontend" -> ["react", "javascript", "frontend"]
 * If the value is already an array, it is returned unchanged.
 */
const tagsPreprocess = (val) => {
  if (typeof val === "string") {
    return val
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return val;
};

/**
 * Ship image validation schema
 */
export const ShipImageSchema = z.object({
  file: z.any().optional(),
  url: z.string().url(),
  alt: z.string().optional(),
  publicId: z.string().optional(),
});

/**
 * Create ship validation schema
 */
export const createShipSchema = z.object({
  shipName: z.string().min(1, "Ship name is required"),
  slug: z.string().min(1, "Slug is required"),
  typeId: z.string().min(1, "Ship type is required"),
  imo: z.coerce.number({ invalid_type_error: "IMO must be a number" }).int().min(1, "IMO is required"),
  refitYear: z.coerce.number().optional(),
  buildYear: z.coerce.number().optional(),
  price: z.coerce.number({ invalid_type_error: "Price must be a number" }).int().min(1, "Price is required"),
  location: z.string().optional(),
  mainEngine: z.string().optional(),
  lengthOverall: z.coerce.number().optional(),
  beam: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  depth: z.coerce.number().optional(),
  draft: z.coerce.number().optional(),
  tonnage: z.coerce.number().optional(),
  cargoCapacity: z.string().optional(),
  buildCountry: z.string().optional(),
  remarks: z.string().optional(),
  description: z.string().optional(),
  images: z.array(ShipImageSchema).optional(),
  mainImage: z
    .instanceof(File, { message: "An image file is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should not exceed 5MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
  imagesAlt: z.record(z.string()).optional(),

  mainImageAlt: z.string().optional(),
  isPublished: z.boolean().optional(),
});

/**
 * Edit Ship validation schema - partial
 */
export const editShipSchema = createShipSchema.partial().extend({
  images: z.array(ShipImageSchema).optional(),
  mainImage: z.union([z.instanceof(File), z.string().url("Must be a valid image URL")]).refine((value) => {
    if (typeof value === "string") return true;
    return value instanceof File && value.type.startsWith("image/");
  }, "Main image must be a valid image file or URL"),
});

/**
 * Ship type/category validation schema
 */
export const createCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  description: z.string().optional(),
});

/**
 * Login validation schema
 */
export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  rememberMe: z.boolean().optional(),
});

/**
 * Addressbook validation schema
 */
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
  priority: addressStatusEnum.default("REGULAR"),
  company: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  userId: z.string().uuid(),
});

/**
 * Event validation schema
 */
export const eventSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    start: z.preprocess(datePreprocess, z.date({ required_error: "Start date are required" })),
    end: z.preprocess(datePreprocess, z.date({ required_error: "End date are required" })),
    location: z.string().optional(),
    reminder: z.number().nullable().optional(),
    status: statusEnum.nullable().optional(),
    priority: priorityEnum.nullable().optional(),
    tags: z.preprocess(tagsPreprocess, z.array(z.string()).optional()),
  })
  .refine((data) => data.start < data.end, {
    message: "Start datum must be before end date",
    path: ["start"],
  });

/**
 * Blog validation schema
 */
export const blogSchema = z.object({
  title: z.string().min(1, "Blog title is required"),
  categoryId: z.coerce.number().optional(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  status: blogStatusEnum.nullable().optional(),
  subTitle: z.string().optional(),
  bannerImage: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Invalid file")
    .refine((file) => !file || file.size <= 5_000_000, "Max file size is 5MB")
    .refine((file) => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type), "Only JPEG, PNG or WEBP images are allowed"),
  bannerImageAlt: z.string().optional(),
  blocks: z.array(
    z.object({
      text: z.string().optional(),
      imageUrl: z
        .any()
        .optional()
        .refine((file) => !file || file instanceof File, "Invalid file")
        .refine((file) => !file || file.size <= 5_000_000, "Max file size is 5MB")
        .refine(
          (file) => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
          "Only JPEG, PNG or WEBP images are allowed",
        ),

      imageAlt: z.string().optional(),
    }),
  ),
});
