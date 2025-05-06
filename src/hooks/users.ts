import { getUser, updateUserAddress, getUserAddresses } from "../actions/users";
import { ShowAddresses, ShowUser } from "../utils/types";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";

export const useGetUserById = (
  userId: string,
): QueryObserverResult<ShowUser> => {
  return useQuery<ShowUser>({
    queryFn: async () => {
      const { data } = await getUser(userId);
      return data;
    },
    queryKey: ["user"],
  });
};

export const useGetUserAddresses = (
  userId: string,
): QueryObserverResult<ShowAddresses> => {
  return useQuery<ShowAddresses>({
    queryFn: async () => {
      const { data } = await getUserAddresses(userId);
      return data;
    },
    queryKey: ["user"],
  });
};

export const useUpdateUserAddress = async (
  id: string,
  data: string[],
): Promise<void> => {
  try {
    await updateUserAddress(id, data);
  } catch (error) {
    console.error("Error Updating Address:", error);
    throw error;
  }
};
