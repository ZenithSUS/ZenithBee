import axios from "axios";

import { API_URL } from "../appwrite";
import { AddFavorite } from "../utils/types";

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 1000000,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const getAllFavorites = async () => {
  return await axiosClient.get("/favorites");
};

export const addToFavorites = async (data: AddFavorite) => {
  return await axiosClient.post(`/favorites`, data);
};

export const removeFromFavorites = async (id: string) => {
  return await axiosClient.delete(`/favorites/${id}`);
};

export const getFavoriteByUser = async (id: string) => {
  return await axiosClient.get(`/favorites/${id}`);
};
