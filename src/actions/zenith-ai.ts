import axios from "axios";
import { API_URL } from "../appwrite";

type ZenithAPI = {
  input: string;
};

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 1000000,
});

export const zenithAI = async (input: ZenithAPI) => {
  const { data } = await axiosClient.post(`/mistral`, input);
  return data;
};
