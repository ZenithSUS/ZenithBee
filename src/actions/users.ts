import axios from "axios";
import { API_URL } from "../appwrite";
import { AddUser } from "../utils/types";

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 100000,
});

export const createUser = async (user: AddUser) => {
  return await axiosClient.post(`/users`, user);
};

export const getUser = async (id: string) => {
  return await axiosClient.get(`/users/${id}`);
};

export const updateUserAddress = async (id: string, data: string[]) => {
  return await axiosClient.put(`/users/${id}`, data);
};
