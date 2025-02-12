import supabase from "./databaseConfig.js";

/* Upload single image */
export const uploadImage = async ({ file, bucket, filePath }) => {
  const { error } = await supabase.storage.from(bucket).upload(filePath, file);
  if (error) {
    console.error("Upload failed:", error.message);
    throw new Error("Categories could not be loaded");
  }

  return filePath;
};

/* Get image public url */
export const getImageUrl = async ({ filePath, bucket }) => {
  const { data, error } = await supabase.storage.from(bucket).getPublicUrl(filePath);

  if (error) {
    console.error("Get image public url failed");
    throw new Error("Categories could not be loaded");
  }

  return data.publicUrl;
};
