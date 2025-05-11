import { ShoppingCart } from "lucide-react";
import { ShowReserved } from "../utils/types";

import { useNavigate } from "react-router-dom";

const ReservedCardChat = ({ reserved }: { reserved: ShowReserved[] }) => {
  const navigate = useNavigate();

  return (
    <div className="flex max-w-[600px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-5 text-black shadow-md transition-all duration-300 hover:shadow-lg">
      <h1 className="text-2xl font-bold">Reserved Product</h1>
      {reserved.map((res) => (
        <div className="flex w-full flex-col gap-3" key={res.reservedId}>
          <div className="flex flex-col gap-2 p-3">
            <div className="flex flex-col md:grid md:grid-cols-2">
              <div className="flex flex-col">
                <p className="font-md mb-2">
                  <span className="font-bold">Reserved Id: </span>
                  {res.reservedId}
                </p>
                <p className="font-md mb-2">
                  <span className="font-bold">Address: </span>
                  {res.address}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-md">
                  <span className="font-bold">Total Price:</span>{" "}
                  {res.totalPrice}
                </p>
                <p className="font-md">
                  <span className="font-bold">Total Items:</span>{" "}
                  {res.totalQuantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-accent-color dark:bg-accent-dark-color hover:bg-accent-color/80 hover:dark:bg-accent-dark-color/80 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-all duration-300 hover:scale-105"
                onClick={() => navigate(`/reserved`)}
              >
                <ShoppingCart />
                Go to Reserved
              </button>
            </div>

            <h1 className="text-2xl font-bold">Items</h1>
            {Array.isArray(res.items) && res.items.length > 0 ? (
              res.items.map((item, index) => (
                <div
                  className="flex flex-col gap-2 p-3"
                  key={`${item.product.$id}-${index}`}
                >
                  <div className="bg-primary-dark-color flex flex-col gap-5 p-5 text-white md:grid md:grid-cols-2">
                    <div className="flex flex-col">
                      <p className="font-md mb-2">
                        <span className="font-bold">Product Name: </span>
                        {item.product.name || item.product[0].name}
                      </p>
                      <p className="font-md mb-2">
                        <span className="font-bold">Quantity: </span>
                        {item.quantity}
                      </p>
                      <p className="font-md">
                        <span className="font-bold">Price:</span>{" "}
                        {Number(parseFloat(String(item.price)).toFixed(2))}
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <img
                        className="h-32 w-32 object-cover"
                        src={item.product.image || item.product[0].image}
                        alt={item.product.name || item.product[0].name}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-md">No items found</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservedCardChat;
