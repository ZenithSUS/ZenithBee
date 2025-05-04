import {
  createOrder,
  getAllOrders,
  getOrderByUser,
  deleteOrder,
  updateOrder,
} from "../actions/orders";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { Order, AddOrder, ShowOrder } from "../utils/types";

export const useGetAllOrders = (): QueryObserverResult<Order[]> => {
  return useQuery<Order[]>({
    queryFn: async () => {
      const { data } = await getAllOrders();
      return data;
    },
    queryKey: ["orders"],
  });
};

export const useGetOrderByUser = (
  id: string,
): QueryObserverResult<ShowOrder[]> => {
  return useQuery<ShowOrder[]>({
    queryFn: async () => {
      const { data } = await getOrderByUser(id);
      return data;
    },
    queryKey: ["order", id],
  });
};
export const useUpdateOrder = async (id: string, data: any): Promise<void> => {
  try {
    await updateOrder(id, data);
  } catch (error) {
    console.error("Error Reserved the order:", error);
    throw error;
  }
};

export const useRemoveOrder = async (id: string): Promise<void> => {
  try {
    await deleteOrder(id);
  } catch (error) {
    console.error("Error Reserved the order:", error);
    throw error;
  }
};

export const useCreateOrder = async (data: AddOrder): Promise<void> => {
  try {
    await createOrder(data);
  } catch (error) {
    console.error("Error Reserved the order:", error);
    throw error;
  }
};
