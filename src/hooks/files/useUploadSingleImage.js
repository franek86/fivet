import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../services/uploadFile.js";
import { toast } from "react-toastify";

export const useUploadSingleImage = () => {
  return useMutation({
    mutationFn: ({ file, bucket, filePath }) => uploadImage({ file, bucket, filePath }),
    onSuccess: () => {
      console.log("Image uploaded");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
