import { getAllProducts } from "../actions/products";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { ShowProducts } from "../utils/types";

export const useGetProducts = (): QueryObserverResult<ShowProducts[]> => {
  return useQuery<ShowProducts[]>({
    queryFn: async () => {
      const { data } = await getAllProducts();
      return data;
    },
    queryKey: ["products"],
  });
};
