import { useState, useEffect } from "react";
import { useGetOrderByUser } from "../../hooks/orders";
import { ShowOrder } from "../../utils/types";
import Loading from "../../components/loading";

export default function Orders() {
  const userId = JSON.parse(localStorage.getItem("id") as string);
  const { data: orders, isLoading } = useGetOrderByUser(userId);
  const [uniqueOrders, setUniqueOrders] = useState<ShowOrder[]>([]);

  useEffect(() => {
    if (orders) {
      setUniqueOrders([
        ...new Map(
          orders.map((item) => [item.orderId, { ...item, isOpen: false }]),
        ).values(),
      ]);
    }
  }, [orders]);

  if (isLoading) return <Loading />;

  const toggleOrderDetails = (orderId: string) => {
    setUniqueOrders(
      uniqueOrders.map((order) =>
        order.orderId === orderId
          ? { ...order, isOpen: !order.isOpen }
          : { ...order, isOpen: false },
      ),
    );
  };

  return (
    <div className="mt-3 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Orders</h1>

      {uniqueOrders?.length === 0 && (
        <h1 className="text-lg">No Orders Found</h1>
      )}
      <div className="flex flex-col gap-4">
        {uniqueOrders.map((orderGroup) => (
          <div
            key={orderGroup.orderId}
            className="bg-primary-color dark:bg-primary-dark-color rounded-md border p-4"
          >
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleOrderDetails(orderGroup.orderId)}
              role="button"
            >
              <div>
                <h2 className="text-lg font-bold">
                  Order ID: {orderGroup.orderId}
                </h2>
                <p className="text-md">
                  Total Quantity: {orderGroup.totalQuantity} items
                </p>
                <p className="text-md">
                  Total Price: ${orderGroup.totalPrice.toFixed(2)}
                </p>
                <p className="text-md">Status: {orderGroup.status}</p>
              </div>

              <div className="flex items-center gap-5">
                <div className="text-3xl">{orderGroup.isOpen ? "▼" : "►"}</div>
              </div>
            </div>

            {orderGroup.isOpen && (
              <div className="mt-3 border-t pt-3">
                {Array.isArray(orderGroup.orders) &&
                  orderGroup.orders.map((item) => (
                    <div
                      key={`${item.$id}-${orderGroup.orderId}-${item.product.$id}`}
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
