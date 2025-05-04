import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { OrderDetail } from "../utils/types";
import { FaRegWindowClose, FaTrashAlt } from "react-icons/fa";
import { OrderModal } from "./modals/order";
import { ReserveModal } from "./modals/reserved";

type OrderType = {
  order: OrderDetail;
  setCurrentOrder: React.Dispatch<React.SetStateAction<string>>;
};

type orderSchemaType = z.infer<typeof orderSchema>;

const orderSchema = z.object({
  quantity: z.string().min(1, { message: "Please enter a quantity." }),
  size: z.string().min(1, { message: "Please enter a size." }),
});

export default function OrderDetails({ order, setCurrentOrder }: OrderType) {
  const [total, setTotal] = useState<number>(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isReservedModalOpen, setIsReservedModalOpen] = useState(false);
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const priceNumber = parseFloat(order.price);
  const priceSizes = {
    small: priceNumber.toFixed(2),
    medium: (priceNumber + priceNumber * 0.35).toFixed(2),
    large: (priceNumber + priceNumber * 0.5).toFixed(2),
    "extra-large": (priceNumber + priceNumber * 0.65).toFixed(2),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const form = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: "",
      size: "",
    },
  });

  const removeOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.tmpId !== id));
    const orderToRemove = orders.find((o) => o.tmpId === id);
    if (orderToRemove?.subtotal) {
      setTotal((prev) => prev - (orderToRemove.subtotal || 0));
    }
  };

  const addOrder = (data: orderSchemaType) => {
    try {
      if (Object.keys(form.formState.errors).length > 0) return;
      let finalPrice = 0;
      switch (data.size) {
        case "small":
          finalPrice = Number(priceSizes.small);
          break;
        case "medium":
          finalPrice = Number(priceSizes.medium);
          break;
        case "large":
          finalPrice = Number(priceSizes.large);
          break;
        case "extra-large":
          finalPrice = Number(priceSizes["extra-large"]);
          break;
        default:
          break;
      }

      const enhancedOrder = {
        ...order,
        tmpId: uuidv4(),
        quantity: parseInt(data.quantity),
        size: data.size,
        subtotal: finalPrice * parseInt(data.quantity),
      };

      setOrders((prev) => [...prev, enhancedOrder]);
      setTotal((prev) => prev + enhancedOrder.subtotal);

      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrder = () => {
    setIsOrderModalOpen(true);
  };

  const handleReserve = () => {
    setIsReservedModalOpen(true);
  };

  const handleClose = () => {
    if (orders.length === 0) {
      setIsVisible(false);
      setTimeout(() => setCurrentOrder(""), 300);
    } else {
      const confirmClose = window.confirm(
        "You have pending orders. Are you sure you want to close?",
      );
      if (confirmClose) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentOrder("");
          setOrders([]);
          setTotal(0);
        }, 300);
      }
    }
  };

  return (
    <div
      className={`bg-primary-color dark:bg-primary-dark-color fixed top-0 right-0 bottom-0 z-50 flex w-[30%] flex-col gap-2.5 overflow-auto p-5 text-black shadow-lg transition-transform duration-300 ease-in-out dark:text-white ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <ReserveModal
        isModalOpen={isReservedModalOpen}
        setIsModalOpen={setIsReservedModalOpen}
        orderDetail={orders}
      />

      <OrderModal
        isModalOpen={isOrderModalOpen}
        setIsModalOpen={setIsOrderModalOpen}
        orderDetail={orders}
      />
      <FaRegWindowClose
        className="absolute top-5 right-5 cursor-pointer transition duration-300 ease-in-out hover:scale-105"
        color="red"
        size={30}
        onClick={handleClose}
      />
      <h1 className="text-3xl font-bold">My Order</h1>
      <div className="flex flex-col">
        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-lg">Delivery address</h2>
            <h1 className="text-3xl font-bold">1342 Morris Street</h1>
          </div>

          <div className="flex flex-col items-end gap-2">
            <h2 className="text-lg">Size Prices</h2>
            <div className="grid grid-cols-2 gap-1">
              <span className="text-sm">S: ${priceSizes.small}</span>
              <span className="text-sm">M: ${priceSizes.medium}</span>
              <span className="text-sm">L: ${priceSizes.large}</span>
              <span className="text-sm">XL: ${priceSizes["extra-large"]}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-1.5 self-start">
            <img
              src={order.image}
              alt={order.name}
              className="h-52 w-52 rounded-2xl object-cover"
            />
            <p className="break-all">{order.description}</p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h1 className="text-lg font-bold">{order.name}</h1>
              <p className="text-lg font-bold">${order.price}</p>
            </div>

            <form
              onSubmit={form.handleSubmit(addOrder)}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity" className="text-md">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min={1}
                  {...form.register("quantity")}
                  className="bg-primary-color w-full border-2 border-black p-1 dark:text-black"
                />
                <span className="text-red-500">
                  {form.formState.errors.quantity?.message}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="size" className="text-md">
                  Size
                </label>
                <select
                  id="size"
                  className="bg-primary-color w-full border-2 border-black p-1 dark:text-black"
                  {...form.register("size")}
                >
                  <option value="">Select Size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
                <span className="text-red-500">
                  {form.formState.errors.size?.message}
                </span>
              </div>
              <button className="bg-accent-color dark:bg-accent-dark-color dark:hover:bg-accent-dark-color/80 hover:bg-accent-color/80 mt-4 cursor-pointer rounded-md p-2 text-white transition duration-300 ease-in-out hover:scale-105">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Display orders list */}
      {orders.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-bold">Order Items</h2>
          <div className="flex flex-col gap-2">
            {orders.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p>
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-bold">
                  ${item.subtotal?.toFixed(2)}{" "}
                  <button onClick={() => removeOrder(item.tmpId || "")}>
                    <FaTrashAlt
                      color="red"
                      size={20}
                      className="ml-2 cursor-pointer"
                    />
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between text-lg">
        <h2 className="text-gray-500">Total</h2>
        <p>$ {total.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          className="bg-accent-color hover:bg-accent-color/80 mt-4 cursor-pointer rounded-md p-2 text-white transition duration-300 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-500"
          disabled={orders.length === 0}
          onClick={handleOrder}
        >
          Submit Order
        </button>
        <button
          className="bg-accent-color hover:bg-accent-color/80 mt-4 cursor-pointer rounded-md p-2 text-white transition duration-300 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-500"
          onClick={handleReserve}
          disabled={orders.length === 0}
        >
          Reserve Order
        </button>
      </div>
    </div>
  );
}
