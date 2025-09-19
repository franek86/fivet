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

const parseOptionalNumber = (val) => {
  if (val == null) return null;
  if (Array.isArray(val)) val = val[0];
  if (val === "") return null;

  const num = Number(val);
  return isNaN(num) ? null : num;
};

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
    .transform((val) => {
      if (!val || val.trim() === "") return undefined;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    });

export const createShipSchema = z.object({
  shipName: z.string().min(1, { message: "Ship name is required" }),
  imo: z.string().min(1, { message: "IMO number is required" }),
  typeId: z.string().uuid().min(1, "Ship type is required"),
  isPublished: z.boolean().optional(),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => /^\d+$/.test(val), { message: "Price must be a whole number without dots or commas" })
    .transform((val) => Number(val)),
  location: z.string().min(1, "Location is required"),
  mainEngine: z.string().min(1, "Main engine is required"),
  lengthOverall: z.string().min(1, "Leght overall is required"),
  length: stringToFloat("Length"),
  beam: stringToFloat("Beam"),
  depth: stringToFloat("Depth"),
  draft: stringToFloat("Draft"),
  tonnage: stringToFloat("Tonnage"),
  cargoCapacity: z.string().min(1, "Cargo capacity is required"),
  buildYear: optionalInt("Build year"),
  refitYear: optionalInt("Refit year"),
  buildCountry: z.string().optional(),
  remarks: z.string().optional(),
  description: z.string().optional(),
  userId: z.string().uuid(),
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
});

// edit ship form schema
export const editShipSchema = z.object({
  userId: z.string().uuid(),
  shipName: z.string().optional(),
  imo: z.string().optional(),
  typeId: z.string().optional(),
  isPublished: z.boolean().optional(),
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
  buildYear: z.preprocess(parseOptionalNumber, z.number().int().positive().nullable().optional()),
  refitYear: z.preprocess(parseOptionalNumber, z.number().int().positive().nullable().optional()),
  buildCountry: z.string().optional(),
  remarks: z.string().optional(),
  description: z.string().optional(),
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
