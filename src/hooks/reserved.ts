import {
  addToReserved,
  removeFromReserved,
  getAllReserved,
  getReservedById,
} from "../actions/reserved";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { Reserved, AddReserved, ShowReserved } from "../utils/types";

export const useAddToReserved = async (data: AddReserved): Promise<void> => {
  try {
    await addToReserved(data);
  } catch (error) {
    console.error("Error Reserved the order:", error);
    throw error;
  }
};

export const useRemoveFromReserved = async (id: string): Promise<void> => {
  try {
    await removeFromReserved(id);
  } catch (error) {
    console.error("Error Reserved the order:", error);
    throw error;
  }
};

export const useGetAllReserved = (): QueryObserverResult<Reserved[]> => {
  return useQuery<Reserved[]>({
    queryFn: async () => {
      const { data } = await getAllReserved();
      return data;
    },
    queryKey: ["reserved"],
  });
};

export const getReservedByUser = (
  id: string,
): QueryObserverResult<ShowReserved[]> => {
  return useQuery<ShowReserved[]>({
    queryFn: async () => {
      const { data } = await getReservedById(id);
      return data;
    },
    queryKey: ["reserved", id],
  });
};
