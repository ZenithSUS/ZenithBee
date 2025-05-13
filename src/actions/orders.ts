import axios from "axios";
import { API_URL } from "../appwrite";

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 100000,
});

export const getAllOrders = async () => {
  return await axiosClient.get("/orders");
};
export const getOrderByUser = async (id: string) => {
  console.log(id);
  return await axiosClient.get(`/orders/${id}`);
};

export const updateOrder = async (id: string, data: any) => {
  return await axiosClient.patch(`/orders/${id}`, data);
};

export const deleteOrder = async (id: string) => {
  return await axiosClient.delete(`/orders/${id}`);
};

export const createOrder = async (data: any) => {
  return await axiosClient.post(`/orders`, data);
};
