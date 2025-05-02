import { AxiosResponse } from "axios";
import {
  addToFavorites,
  removeFromFavorites,
  getFavoriteByUser,
} from "../actions/favorites";
import {
  useQuery,
  useMutation,
  UseBaseMutationResult,
  QueryObserverResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AddFavorite, Favorite } from "../utils/types";
import { toast } from "react-toastify";

export const useAddToFavorite = (): UseBaseMutationResult<
  AxiosResponse<AddFavorite>,
  unknown,
  AddFavorite,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddFavorite) => await addToFavorites(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Added to favorites!");
    },
    onError: () => toast.error("Failed to add to favorites!"),
  });
};

export const useRemoveFromFavorite = (): UseBaseMutationResult<
  AxiosResponse<string>,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await removeFromFavorites(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Removed from favorites!");
    },
    onError: () => toast.error("Failed to remove from favorites!"),
  });
};

export const useGetFavoriteByUser = (
  userId: string,
): QueryObserverResult<Favorite[]> => {
  return useQuery<Favorite[]>({
    queryFn: async () => {
      const { data } = await getFavoriteByUser(userId);
      return data;
    },
    queryKey: ["favorites", userId],
  });
};
