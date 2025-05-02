import {
  addToReserved,
  removeFromReserved,
  getAllReserved,
} from "../actions/reserved";
import {
  useMutation,
  useQuery,
  QueryObserverResult,
  useQueryClient,
  UseBaseMutationResult,
} from "@tanstack/react-query";
import { Reserved, AddReserved } from "../utils/types";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export const useAddToReserved = (): UseBaseMutationResult<
  AxiosResponse<AddReserved>,
  unknown,
  AddReserved,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddReserved) => await addToReserved(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reserved"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("Failed to add to reserved!"),
  });
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
