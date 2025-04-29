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
