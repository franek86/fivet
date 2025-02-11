import { useMutation } from "@tanstack/react-query";
import { getImageUrl } from "../../services/uploadFile.js";

export const useImagePublicUrl = () => {
  const { mutate } = useMutation({
    mutationFn: ({ filePath, bucket }) => getImageUrl({ filePath, bucket }),
    onSuccess: () => {
      console.log("Successfully get image public url");
    },
    onError: (error) => {
      console.error("Error fetching image URL:", error);
    },
  });

  return { mutate };
};
