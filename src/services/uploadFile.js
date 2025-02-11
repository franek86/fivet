import supabase from "./databaseConfig.js";

/* Upload single image */
export const uploadImage = async ({ file, bucket }) => {
  if (!file) throw new Error("No file provided");
  if (!bucket) throw new Error("No bucket specified");

  const fileName = `${Date.now()}-${file.name}`.replaceAll(/\s/g, "-");

  const { error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) {
    console.error("Upload failed:", error.message);
    throw new Error("Categories could not be loaded");
  }
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
