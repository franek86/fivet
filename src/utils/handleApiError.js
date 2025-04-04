import { toast } from "react-toastify";
import axios from "axios";

export const handleApiError = (error, fallbackMessage = "Something went wrong") => {
  let message = fallbackMessage;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    switch (status) {
      case 400:
        message = serverMessage || "Bad request.";
        break;
      case 401:
        message = serverMessage || "Unauthorized. Please log in.";
        break;
      case 403:
        message = serverMessage || "Forbidden.";
        break;
      case 404:
        message = serverMessage || "Not found.";
        break;
      case 429:
        message = serverMessage || "Too many requests. Try again later.";
        break;
      case 500:
        message = "Internal server error. Please try again later.";
        break;
      default:
        message = serverMessage || error.message || fallbackMessage;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
};
