import axios from "axios";
import { API_URL } from "../appwrite";
import { AddReserved } from "../utils/types";

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 100000,
});

export const getAllReserved = async () => {
  return await axiosClient.get("/reserved");
};

export const addToReserved = async (data: AddReserved) => {
  return await axiosClient.post(`/reserved`, data);
};

export const removeFromReserved = async (id: string) => {
  return await axiosClient.delete(`/reserved/${id}`);
};

export const getReservedByUser = async (id: string) => {
  return await axiosClient.get(`/reserved/${id}`);
};

export const updateReserved = async (id: string, data: AddReserved) => {
  return await axiosClient.patch(`/reserved/${id}`, data);
};

export const getReservedById = async (id: string) => {
  return await axiosClient.get(`/reserved/${id}`);
};
