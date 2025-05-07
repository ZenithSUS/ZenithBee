import Modal from "react-modal";
import { useState, useEffect, useTransition } from "react";
import { useRemoveFromReserved } from "../../hooks/reserved";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useCreateOrder } from "../../hooks/orders";
import { ReservedOrderDetail } from "../../utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";

type ReservedToOrderProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  orderDetail: ReservedOrderDetail[];
  address: string;
  reservedId: string;
  setReserveId: React.Dispatch<React.SetStateAction<string>>;
};

export default function ReservedToOrderModal({
  isModalOpen,
  setIsModalOpen,
  orderDetail,
  address,
  reservedId,
  setReserveId,
}: ReservedToOrderProps) {
  const name = JSON.parse(localStorage.getItem("name") || "");
  const [modalScale, setModalScale] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleOrder = () => {
    const orderId = uuidv4();
    orderDetail.forEach((order) => {
      order.items.forEach((item) => {
        const data = {
          orderId: orderId,
          user: JSON.parse(localStorage.getItem("id") || "") as string,
          product: item.product.$id as string,
          size: item.size,
          quantity: item.quantity.toString() as string,
          price: Number(item.price).toFixed(2).toString() as string,
          address: address,
        };
        startTransition(async () => {
          await useCreateOrder(data);
          queryClient.invalidateQueries({ queryKey: ["order"] });
          queryClient.invalidateQueries({ queryKey: ["reserved"] });
          queryClient.invalidateQueries({ queryKey: ["user"] });
        });
      });
    });
    startTransition(async () => {
      await useRemoveFromReserved(reservedId);
    });

    if (!isPending) {
      toast.success("Added to Orders");
      setReserveId("");
      navigate("/orders");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setInternalOpen(true);
      setTimeout(() => {
        setModalScale(true);
      }, 50);
    } else {
      setModalScale(false);
      setTimeout(() => {
        setInternalOpen(false);
      }, 300);
    }
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={internalOpen}
      parentSelector={() => document.querySelector("#root") as HTMLElement}
      className={
        "bg-opacity-100 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      }
      overlayClassName={
        "fixed inset-0 z-[100] bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
      }
    >
      <div className="flex min-w-screen flex-col items-center justify-center md:min-w-[400px]">
        <div
          className={`bg-primary-color dark:bg-primary-dark-color flex flex-col p-6 transition duration-300 ease-in-out ${
            modalScale ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between gap-5">
            <h1 className="text-center text-2xl font-bold">Order Details</h1>
            <FaRegWindowClose
              className="cursor-pointer transition duration-300 ease-in-out hover:scale-105"
              color="red"
              size={30}
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          </div>

          <h1 className="text-lg font-semibold">Name: {name}</h1>
          <p>Address: {address}</p>
          <div className="flex flex-col gap-2">
            {orderDetail.map((order, index) => (
              <div key={index}>
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
                  {order.items.map((item, itemIndex) => (
                    <div
                      className="flex items-center justify-between gap-3 border-b py-2"
                      key={`${item.product.$id}-${itemIndex}`}
                    >
                      <div className="flex items-center gap-5">
                        <img
                          className="h-16 w-16 object-cover"
                          src={item.product.image}
                          alt={item.product.name}
                        />

                        <div className="mb-1 flex flex-col">
                          <h1 className="font-semibold">{item.product.name}</h1>
                          <p>
                            Size: {item.size} | Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="ml-8">
                        ${(Number(item.price) ?? 0).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-b py-2">
                  <h1 className="font-semibold">Total</h1>
                  <p>${order.totalPrice}</p>
                </div>
              </div>
            ))}
            <button
              className="bg-accent-color hover:bg-accent-hover dark:hover:bg-accent-hover/50 dark:bg-accent-dark-color mt-3 cursor-pointer p-2 text-white transition duration-300 ease-in-out disabled:bg-gray-500"
              onClick={handleOrder}
              disabled={isPending}
            >
              {isPending ? "Ordering..." : "Order"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
