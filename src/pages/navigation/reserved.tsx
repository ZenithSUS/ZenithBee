import { useState, useEffect } from "react";
import { getReservedByUser } from "../../hooks/reserved";
import { ReservedOrderDetail, ShowReserved, Products } from "../../utils/types";
import { TrashIcon } from "lucide-react";
import { Bell } from "lucide-react";
import ReservedToOrderModal from "../../components/modals/reserved-to-order";
import DeleteModal from "../../components/modals/delete-reserved";
import Loading from "../../components/loading";

export default function Reserved() {
  const userId = JSON.parse(localStorage.getItem("id") as string);
  const { data: reserved, isLoading } = getReservedByUser(userId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResToOrdModalOpen, setIsResToOrdModalOpen] = useState(false);
  const [reserveId, setReserveId] = useState("");
  const [orderDetail, setOrderDetail] = useState<ReservedOrderDetail[]>([]);
  const [address, setAddress] = useState("");

  const [uniqueOrders, setUniqueOrders] = useState<ShowReserved[]>([]);

  useEffect(() => {
    if (reserved) {
      setUniqueOrders([
        ...new Map(
          reserved.map((item) => [item.reservedId, { ...item, isOpen: false }]),
        ).values(),
      ]);
    }
  }, [reserved]);

  const handleRemoveFromReserved = async (reserveId: string) => {
    setReserveId(reserveId);
    setIsDeleteModalOpen(true);
  };

  const handleReservedToOrder = async (reserveId: string, address: string) => {
    setReserveId(reserveId);
    setAddress(address);

    // Find the specific order with the matching reservedId
    const selectedOrder = uniqueOrders.find(
      (order) => order.reservedId === reserveId,
    );

    if (selectedOrder) {
      const formattedOrder: ReservedOrderDetail = {
        reservedId: selectedOrder.reservedId,
        address: selectedOrder.address,
        items: Array.isArray(selectedOrder.items)
          ? selectedOrder.items.map((item) => ({
              size: item.size,
              quantity: item.quantity,
              price: Number(item.price),
              user: item.user,
              image: item.product.image,
              product: item.product as Products,
            }))
          : [],
        totalPrice: selectedOrder.totalPrice.toFixed(2),
      };
      setOrderDetail([formattedOrder]);
      setIsResToOrdModalOpen(true);
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setUniqueOrders(
      uniqueOrders.map((order) =>
        order.reservedId === orderId
          ? { ...order, isOpen: !order.isOpen }
          : { ...order, isOpen: false },
      ),
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mt-3 flex flex-col gap-5">
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        reserveId={reserveId}
        setReserveId={setReserveId}
      />

      <ReservedToOrderModal
        isModalOpen={isResToOrdModalOpen}
        setIsModalOpen={setIsResToOrdModalOpen}
        reservedId={reserveId}
        address={address}
        setReserveId={setReserveId}
        orderDetail={orderDetail}
      />

      <h1 className="text-2xl font-bold">Reserved Orders</h1>

      {uniqueOrders.length === 0 && (
        <h1 className="text-lg">No Reserved Orders Found</h1>
      )}

      <div className="flex flex-col gap-4">
        {uniqueOrders.map((orderGroup) => (
          <div
            key={orderGroup.reservedId}
            className="bg-primary-color dark:bg-primary-dark-color rounded-md border p-4"
          >
            <div className="flex cursor-pointer items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Reserved ID: {orderGroup.reservedId}
                </h2>
                <p className="text-md">Address: {orderGroup.address}</p>
                <p className="text-md">
                  Total Quantity: {orderGroup.totalQuantity} items
                </p>
                <p className="text-md">
                  Total Price: ${orderGroup.totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <div
                  className="text-3xl"
                  onClick={() => toggleOrderDetails(orderGroup.reservedId)}
                  role="button"
                >
                  {orderGroup.isOpen ? "▼" : "►"}
                </div>
                <button type="button" className="text-xl">
                  <Bell
                    className="h-6 w-6 cursor-pointer"
                    onClick={() =>
                      handleReservedToOrder(
                        orderGroup.reservedId,
                        orderGroup.address,
                      )
                    }
                    color="green"
                  />
                </button>
                <button type="button" className="text-xl">
                  <TrashIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={() =>
                      handleRemoveFromReserved(orderGroup.reservedId)
                    }
                    color="red"
                  />
                </button>
              </div>
            </div>

            {orderGroup.isOpen && (
              <div className="mt-3 border-t pt-3">
                {Array.isArray(orderGroup.items) &&
                  orderGroup.items.map((item) => (
                    <div
                      key={`${item.$id}-${orderGroup.reservedId}-${item.product.$id}`}
                      className="mb-3 border-b pb-2 last:border-0"
                    >
                      <div className="flex justify-between">
                        <div className="grid grid-cols-1">
                          <h3 className="text-lg font-semibold">
                            {item.product.name}
                          </h3>
                          <p>Size: {item.size}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>
                            Price: $
                            {Number(parseFloat(String(item.price)).toFixed(2))}
                          </p>
                        </div>

                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-25 w-25 rounded-md object-cover"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
