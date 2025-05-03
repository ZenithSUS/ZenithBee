import { useEffect, useState } from "react";
import { getReservedByUser } from "../../hooks/reserved";
import { ShowReserved } from "../../utils/types";
import { TrashIcon } from "lucide-react";
import DeleteModal from "../../components/modals/delete-reserved";
import Loading from "../../components/loading";

export default function Reserved() {
  const userId = JSON.parse(localStorage.getItem("id") as string);
  const { data: reserved, isLoading } = getReservedByUser(userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reserveId, setReserveId] = useState("");

  const [uniqueOrders, setUniqueOrders] = useState<
    {
      reservedId: string;
      items: ShowReserved[];
      isOpen: boolean;
      totalPrice: number;
      totalQuantity: number;
    }[]
  >([]);

  useEffect(() => {
    if (!reserved) return;

    const reservedMap = new Map();

    reserved.forEach((order) => {
      if (!reservedMap.has(order.reservedId)) {
        reservedMap.set(order.reservedId, []);
      }
      reservedMap.get(order.reservedId).push(order);
    });

    const uniqueOrderGroups = Array.from(reservedMap.entries()).map(
      ([id, items]) => {
        const totalPrice = items.reduce(
          (sum: number, item: { price: string }) =>
            sum + (parseFloat(item.price) || 0),
          0,
        );
        const totalQuantity = items.reduce(
          (sum: number, item: { quantity: string }) =>
            sum + (parseInt(item.quantity) || 0),
          0,
        );

        return {
          reservedId: id,
          items,
          isOpen: false,
          totalPrice,
          totalQuantity,
        };
      },
    );

    setUniqueOrders(uniqueOrderGroups);
  }, [reserved]);

  const handleRemoveFromReserved = async (reserveId: string) => {
    setReserveId(reserveId);
    setIsModalOpen(true);
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
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        reserveId={reserveId}
        setReserveId={setReserveId}
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
                {orderGroup.items.map((item) => (
                  <div
                    key={`${orderGroup.reservedId}-${item.product.$id}`}
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
