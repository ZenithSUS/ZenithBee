import axios from "axios";
import { API_URL } from "../appwrite";

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 100000,
});

export const getAllProducts = async () => {
  return await axiosClient.get("/products");
};
