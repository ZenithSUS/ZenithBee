import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useGetUserAddresses } from "../hooks/users";
import { FaRegWindowClose, FaTrashAlt } from "react-icons/fa";
import { OrderModal } from "./modals/order";
import { ReserveModal } from "./modals/reserved";
import { useOrderContext } from "../context/order";

type OrderDetailsProps = {
  setCurrentOrder: React.Dispatch<React.SetStateAction<string>>;
};

type orderSchemaType = z.infer<typeof orderSchema>;

const orderSchema = z.object({
  quantity: z.string().min(1, { message: "Please enter a quantity." }),
  size: z.string().min(1, { message: "Please enter a size." }),
  address: z.string().min(1, { message: "Please select an address." }),
});

export default function OrderDetails({}: OrderDetailsProps) {
  const userId = JSON.parse(localStorage.getItem("id") || "") as string;
  const currentAddressRef = useRef<HTMLHeadingElement | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isReservedModalOpen, setIsReservedModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { data: userAddresses, isLoading } = useGetUserAddresses(userId);

  const {
    orders,
    setOrders,
    total,
    setTotal,
    selectedAddress,
    setSelectedAddress,
    isAddressLocked,
    setIsAddressLocked,
    currentOrderDetail,
    setIsOrderDetailOpen,
    orderDetailOpen,
  } = useOrderContext();

  // Define all hooks before any conditional returns
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [orderDetailOpen]);

  useEffect(() => {
    if (userAddresses && userAddresses.address.length > 0 && !selectedAddress) {
      setSelectedAddress(userAddresses.address[0]);
      if (form) {
        form.setValue("address", userAddresses.address[0]);
      }
    }
  }, [userAddresses, selectedAddress, setSelectedAddress]);

  const form = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: "",
      size: "",
      address: selectedAddress || "",
    },
  });

  if (!currentOrderDetail) {
    return null;
  }

  const priceNumber = parseFloat(currentOrderDetail.price);
  const priceSizes = {
    small: priceNumber.toFixed(2),
    medium: (priceNumber + priceNumber * 0.35).toFixed(2),
    large: (priceNumber + priceNumber * 0.5).toFixed(2),
    "extra-large": (priceNumber + priceNumber * 0.65).toFixed(2),
  };

  const removeOrder = (id: string) => {
    setOrders((prev) => {
      const filtered = prev.filter((o) => o.tmpId !== id);

      if (filtered.length === 0) {
        setIsAddressLocked(false);
      }
      return filtered;
    });

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
        ...currentOrderDetail,
        tmpId: uuidv4(),
        quantity: parseInt(data.quantity),
        size: data.size,
        address: data.address,
        subtotal: finalPrice * parseInt(data.quantity),
      };

      setOrders((prev) => [...prev, enhancedOrder]);
      setTotal((prev) => prev + enhancedOrder.subtotal);

      if (!isAddressLocked) {
        setIsAddressLocked(true);
      }

      form.reset({
        quantity: "",
        size: "",
        address: selectedAddress,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const address = e.target.value;
    setSelectedAddress(address);
    if (currentAddressRef.current) {
      currentAddressRef.current.textContent = address;
    }
  };

  const handleOrder = () => {
    setIsOrderModalOpen(true);
  };

  const handleReserve = () => {
    setIsReservedModalOpen(true);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOrderDetailOpen(false);
    }, 300); // Wait for animation to complete
  };

  return (
    <div
      className={`bg-primary-color dark:bg-primary-dark-color fixed top-0 right-0 bottom-0 z-50 flex flex-col gap-2.5 overflow-auto p-5 text-black shadow-lg transition-transform duration-300 ease-in-out dark:text-white ${isVisible ? "translate-x-0" : "translate-x-full"} w-full lg:w-[40%] xl:w-[30%]`}
    >
      <ReserveModal
        isModalOpen={isReservedModalOpen}
        setIsModalOpen={setIsReservedModalOpen}
        orderDetail={orders}
        address={selectedAddress}
        setIsAddressLocked={setIsAddressLocked}
        setSelectedAddress={setSelectedAddress}
        setOrders={setOrders}
        setTotal={setTotal}
      />

      <OrderModal
        isModalOpen={isOrderModalOpen}
        setIsModalOpen={setIsOrderModalOpen}
        orderDetail={orders}
        address={selectedAddress}
        setIsAddressLocked={setIsAddressLocked}
        setSelectedAddress={setSelectedAddress}
        setOrders={setOrders}
        setTotal={setTotal}
      />
      <FaRegWindowClose
        className="absolute top-5 right-5 cursor-pointer transition duration-300 ease-in-out hover:scale-105"
        color="red"
        size={30}
        onClick={handleClose}
      />
      <h1 className="text-2xl font-bold md:text-3xl">My Order</h1>

      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <h2 className="text-base md:text-lg">Delivery address</h2>
            <h1
              className="max-w-full truncate text-xl font-bold md:text-2xl"
              ref={currentAddressRef}
            >
              {isLoading
                ? "..."
                : selectedAddress ||
                  userAddresses?.address[0] ||
                  "No address available"}
            </h1>
          </div>

          <div className="mt-2 flex flex-col gap-1 sm:mt-0 sm:items-end">
            <h2 className="text-base md:text-lg">Size Prices</h2>
            <div className="grid grid-cols-2 gap-1 text-xs md:text-sm">
              <span>S: ${priceSizes.small}</span>
              <span>M: ${priceSizes.medium}</span>
              <span>L: ${priceSizes.large}</span>
              <span>XL: ${priceSizes["extra-large"]}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid grid-cols-1 gap-1.5 self-start">
            <img
              src={currentOrderDetail.image}
              alt={currentOrderDetail.name}
              className="mx-auto h-40 w-40 rounded-2xl object-cover sm:mx-0 sm:h-52 sm:w-52"
            />
            <p className="text-sm break-all md:text-base">
              {currentOrderDetail.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h1 className="text-base font-bold md:text-lg">
                {currentOrderDetail.name}
              </h1>
              <p className="text-base font-bold md:text-lg">
                ${currentOrderDetail.price}
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(addOrder)}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="quantity" className="md:text-md text-sm">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min={1}
                  {...form.register("quantity")}
                  className="bg-primary-color w-full border-2 border-black p-1 dark:text-black"
                />
                <span className="text-xs text-red-500">
                  {form.formState.errors.quantity?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="size" className="md:text-md text-sm">
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
                <span className="text-xs text-red-500">
                  {form.formState.errors.size?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="address" className="md:text-md text-sm">
                  Address{" "}
                  {isAddressLocked && (
                    <span className="text-xs text-gray-500">(locked)</span>
                  )}
                </label>
                <select
                  id="address"
                  className={`bg-primary-color w-full border-2 border-black p-1 dark:text-black ${
                    isAddressLocked ? "cursor-not-allowed opacity-75" : ""
                  }`}
                  {...form.register("address")}
                  onChange={handleAddressChange}
                  value={selectedAddress}
                  disabled={isAddressLocked}
                >
                  <option value="">Select Address</option>
                  {userAddresses?.address?.map((addr, index) => (
                    <option key={index} value={addr}>
                      {addr}
                    </option>
                  ))}
                </select>
                {isAddressLocked && (
                  <span className="text-xs text-gray-500">
                    Address cannot be changed after adding your first item
                  </span>
                )}
                <span className="text-xs text-red-500">
                  {form.formState.errors.address?.message}
                </span>
              </div>
              <button className="bg-accent-color dark:bg-accent-dark-color dark:hover:bg-accent-dark-color/80 hover:bg-accent-color/80 mt-2 cursor-pointer rounded-md p-2 text-white transition duration-300 ease-in-out hover:scale-105 md:mt-4">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Display orders list */}
      {orders.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-2 text-lg font-bold md:text-xl">Order Items</h2>
          <div className="flex flex-col gap-2">
            {orders.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="text-sm font-bold md:text-base">{item.name}</p>
                  <p className="text-xs md:text-sm">
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold md:text-base">
                  ${item.subtotal?.toFixed(2)}{" "}
                  <button onClick={() => removeOrder(item.tmpId || "")}>
                    <FaTrashAlt
                      color="red"
                      size={18}
                      className="ml-2 cursor-pointer"
                    />
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between text-base md:text-lg">
        <h2 className="text-gray-500">Total</h2>
        <p>$ {total <= 0 ? "0.00" : total.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          className="bg-accent-color hover:bg-accent-color/80 dark:bg-accent-dark-color dark:hover:bg-accent-dark-color/80 mt-2 cursor-pointer rounded-md p-2 text-sm text-white transition duration-300 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-500 md:mt-4 md:text-base"
          disabled={orders.length === 0}
          onClick={handleOrder}
        >
          Submit Order
        </button>
        <button
          className="bg-accent-color hover:bg-accent-color/80 dark:bg-accent-dark-color dark:hover:bg-accent-dark-color/80 mt-2 cursor-pointer rounded-md p-2 text-sm text-white transition duration-300 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-500 md:mt-4 md:text-base"
          onClick={handleReserve}
          disabled={orders.length === 0}
        >
          Reserve Order
        </button>
      </div>
    </div>
  );
}
