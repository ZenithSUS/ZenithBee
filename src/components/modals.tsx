import Modal from "react-modal";
import { account } from "../appwrite";
import { FaRegWindowClose } from "react-icons/fa";
import { OrderDetail, ShowProducts } from "../utils/types";
import { useEffect, useState, useTransition } from "react";
import { useAddToReserved } from "../hooks/reserved";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

Modal.setAppElement("#root");

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function LogoutModal({ isModalOpen, setIsModalOpen }: ModalProps) {
  const [modalScale, setModalScale] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

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

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      localStorage.clear();
      setIsModalOpen(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
      <div
        className={`bg-primary-color dark:bg-primary-dark-color w-full max-w-md transform overflow-hidden rounded-2xl p-6 transition-all duration-300 ease-in-out ${
          modalScale ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <div className="flex flex-col">
          <div className="ml-3 text-left">
            <h3 className="text-lg font-bold">Logout</h3>
            <p className="text-sm">Are you sure you want to logout?</p>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-accent-color dark:bg-accent-dark-color cursor-pointer rounded-md p-2 text-sm font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-md bg-red-600 p-2 text-sm font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function ProductModal({
  isModalOpen,
  setIsModalOpen,
  product,
}: ModalProps & { product: ShowProducts }) {
  const [modalScale, setModalScale] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

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
          className={`card bg-base-100 w-96 shadow-sm transition-all duration-300 ease-in-out ${
            modalScale ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <figure className="relative">
            <FaRegWindowClose
              className="absolute top-5 right-5 cursor-pointer transition duration-300 ease-in-out hover:scale-105"
              color="red"
              size={30}
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
            <img src={product.image} alt={product.name} />
          </figure>
          <div className="card-body">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-gray-500">{product.foodType}</p>
              </div>

              <p className="text-end text-xl font-bold">${product.price}</p>
            </div>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function ReserveModal({
  isModalOpen,
  setIsModalOpen,
  orderDetail,
}: ModalProps & { orderDetail: OrderDetail[] }) {
  const [modalScale, setModalScale] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleReserve = () => {
    const reservedId = uuidv4();
    orderDetail.forEach((order) => {
      const data = {
        reservedId: reservedId,
        user: JSON.parse(localStorage.getItem("id") || "") as string,
        product: order.$id as string,
        size: order.size,
        quantity: order.quantity.toString() as string,
        price: order.subtotal.toFixed(2).toString() as string,
      };
      startTransition(async () => {
        await useAddToReserved(data);
        await queryClient.invalidateQueries({ queryKey: ["favorites"] });
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      });
    });
    if (!isPending) {
      setIsModalOpen(false);
      toast.success("Added to reserved!");
      navigate("/reserved");
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
            <h1 className="text-center text-2xl font-bold">
              Reserve Order Details
            </h1>
            <FaRegWindowClose
              className="cursor-pointer transition duration-300 ease-in-out hover:scale-105"
              color="red"
              size={30}
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            {orderDetail.map((item) => (
              <div
                className="flex items-center justify-between border-b py-2"
                key={item.tmpId}
              >
                <div className="mb-1 flex flex-col">
                  <h1 className="font-semibold">{item.name}</h1>
                  <p>
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                </div>
                <p>${(item.subtotal ?? 0).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Total</h1>
            <p>
              $
              {orderDetail
                .reduce((a, b) => a + (b?.subtotal || 0), 0)
                .toFixed(2)}
            </p>
          </div>
          <button
            className="bg-accent-color hover:bg-accent-hover dark:hover:bg-accent-hover/50 dark:bg-accent-dark-color mt-3 cursor-pointer p-2 transition duration-300 ease-in-out disabled:bg-gray-500"
            onClick={handleReserve}
            disabled={isPending}
          >
            Reserve Order
          </button>
        </div>
      </div>
    </Modal>
  );
}
