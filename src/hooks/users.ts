import { getUser, updateUserAddress } from "../actions/users";
import { ShowUser } from "../utils/types";
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
