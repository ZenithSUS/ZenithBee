import { zenithAI } from "../actions/zenith-ai";
import { useMutation } from "@tanstack/react-query";

type ZenithAPI = {
  userId: string;
  input: string;
};

export const useZenithAI = () => {
  return useMutation({
    mutationFn: async (userInput: ZenithAPI) => {
      const { data } = await zenithAI(userInput);
      return data;
    },
  });
};
