import { z } from "zod";
import moment from "moment";

const StatusEnum = z.enum(["REGULAR", "IMPORTANT"]);
const statusEnum = z.enum(["planned", "done", "canceled"]);
const priorityEnum = z.enum(["low", "medium", "high"]);

const datePreprocess = (arg) => {
  if (!arg) return undefined;
  if (arg instanceof Date) return arg;
  if (moment.isMoment(arg)) return arg.toDate();
  if (typeof arg === "string") return new Date(arg);
  return undefined;
};

const tagsPreprocess = (val) => {
  if (typeof val === "string") {
    return val
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return val;
};

export const createShipSchema = z.object({
  shipName: z.string().min(1, "Ship name is required"),
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
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        url: z.string().optional(),
      })
    )
    .optional(),

  mainImage: z
    .instanceof(File, { message: "An image file is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should not exceed 5MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
  isPublished: z.boolean().optional(),
});

// edit ship form schema
export const editShipSchema = createShipSchema.partial().extend({
  images: z.any().optional(),
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
  rememberMe: z.boolean().optional(),
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

//Event schema
export const eventSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    start: z.preprocess(datePreprocess, z.date({ required_error: "Start date are required" })),
    end: z.preprocess(datePreprocess, z.date({ required_error: "End date are required" })),
    location: z.string().optional(),
    reminder: z.number().int().min(0).nullable().optional(),
    status: statusEnum.nullable().optional(),
    priority: priorityEnum.nullable().optional(),
    tags: z.preprocess(tagsPreprocess, z.array(z.string()).optional()),
    userId: z.string().uuid("User ID must be valid"),
  })
  .refine((data) => data.start < data.end, {
    message: "Start datum must be before end date",
    path: ["start"],
  });
