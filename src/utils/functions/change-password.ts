import { toast } from "react-toastify";
import { account } from "../../appwrite";
import { AppwriteError } from "../types";

export default async function changePassword(
  newPassword: string,
  oldPassword: string,
) {
  try {
    await account.updatePassword(newPassword, oldPassword);
    toast.success("Password Changed Successfully!");
  } catch (error) {
    console.error("Password change error:", error);

    if (typeof error === "object" && error !== null && "code" in error) {
      const err = error as AppwriteError;

      switch (err.code) {
        case 400:
          toast.error("Invalid password format!");
          break;
        case 401:
          toast.error("Current password is incorrect!");
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
          toast.error(
            `Password change failed: ${err.message || "Please try again."}`,
          );
      }
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
}
