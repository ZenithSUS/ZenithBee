import axios from "axios";
import { API_URL } from "../appwrite";

type ZenithAPI = {
  userId: string;
  input: string;
};

const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 1000000,
});

export const zenithAI = async (userInput: ZenithAPI) => {
  return await axiosClient.post(`/mistral`, userInput);
};
