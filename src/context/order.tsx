import React, { createContext, useContext, useState, ReactNode } from "react";
import { OrderDetail } from "../utils/types";

interface OrderContextType {
  orders: OrderDetail[];
  setOrders: React.Dispatch<React.SetStateAction<OrderDetail[]>>;
  currentOrder: string;
  setCurrentOrder: React.Dispatch<React.SetStateAction<string>>;
  orderDetailOpen: boolean;
  setIsOrderDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  selectedAddress: string;
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
  isAddressLocked: boolean;
  setIsAddressLocked: React.Dispatch<React.SetStateAction<boolean>>;
  currentOrderDetail: OrderDetail | null;
  setCurrentOrderDetail: React.Dispatch<
    React.SetStateAction<OrderDetail | null>
  >;
}

const initialContext: OrderContextType = {
  orders: [],
  setOrders: () => {},
  currentOrder: "",
  setCurrentOrder: () => {},
  orderDetailOpen: false,
  setIsOrderDetailOpen: () => {},
  total: 0,
  setTotal: () => {},
  selectedAddress: "",
  setSelectedAddress: () => {},
  isAddressLocked: false,
  setIsAddressLocked: () => {},
  currentOrderDetail: null,
  setCurrentOrderDetail: () => {},
};

const OrderContext = createContext<OrderContextType>(initialContext);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isAddressLocked, setIsAddressLocked] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<string>("");
  const [orderDetailOpen, setIsOrderDetailOpen] = useState<boolean>(false);
  const [currentOrderDetail, setCurrentOrderDetail] =
    useState<OrderDetail | null>(null);

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        currentOrder,
        setCurrentOrder,
        orderDetailOpen,
        setIsOrderDetailOpen,
        total,
        setTotal,
        selectedAddress,
        setSelectedAddress,
        isAddressLocked,
        setIsAddressLocked,
        currentOrderDetail,
        setCurrentOrderDetail,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
