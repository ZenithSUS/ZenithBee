import {
  addToReserved,
  removeFromReserved,
  getAllReserved,
  getReservedById,
} from "../actions/reserved";
import {
  useMutation,
  useQuery,
  QueryObserverResult,
  useQueryClient,
  UseBaseMutationResult,
} from "@tanstack/react-query";
import { Reserved, AddReserved, ShowReserved } from "../utils/types";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export const useAddToReserved = async (data: AddReserved): Promise<void> => {
  try {
    await addToReserved(data);
  } catch (error) {
    console.error("Error Reserved the order:", error);
    throw error;
  }
};

export const useRemoveFromReserved = (): UseBaseMutationResult<
  AxiosResponse<string>,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await removeFromReserved(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reserved"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Removed from reserved!");
    },
    onError: () => toast.error("Failed to remove from reserved!"),
  });
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
