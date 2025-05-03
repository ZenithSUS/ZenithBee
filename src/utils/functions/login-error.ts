import { toast } from "react-toastify";
import { AppwriteError } from "../types";

export const handleLoginError = (error: unknown) => {
  console.error("Login error:", error);
  if (typeof error === "object" && error !== null && "code" in error) {
    const err = error as AppwriteError;

    switch (err.code) {
      case 400:
        toast.error("Invalid Credentials!");
        break;
      case 401:
        toast.error("Invalid Credentials!");
        break;
      case 404:
        toast.error("User not found!");
        break;
      case 429:
        toast.error("Too many requests. Please try again later.");
        break;
      case 500:
        toast.error("Internal Server Error! Please try again later.");
        break;
      default:
        toast.error("Login failed. Please try again.");
    }
  } else {
    toast.error("An unexpected error occurred. Please try again.");
  }
};
