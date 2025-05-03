import {
  addToFavorites,
  removeFromFavorites,
  getFavoriteByUser,
} from "../actions/favorites";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { AddFavorite, Favorite } from "../utils/types";

export const useAddToFavorite = async (data: AddFavorite): Promise<void> => {
  try {
    await addToFavorites(data);
  } catch (error) {
    console.error("Error Reserved the order:", error);
    throw error;
  }
};

export const useRemoveFromFavorite = async (id: string): Promise<void> => {
  try {
    await removeFromFavorites(id);
  } catch (error) {
    console.error("Error Reserved the order:", error);
    throw error;
  }
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
