import { useState } from "react";
import { ShowReserved } from "../utils/types";
import { ProductModal } from "./modals/product";
import { Eye } from "lucide-react";

const ReservedCardChat = ({ reserved }: { reserved: ShowReserved }) => {
  let product = null;

  if (reserved) {
    product = Array.isArray(reserved.product)
      ? reserved.product[0]
      : reserved.product;
  }
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={product}
      />
      <div className="relative h-36 w-full overflow-hidden bg-gray-50">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-2 text-start text-sm font-medium text-gray-800">
              {product?.name}
            </h3>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm font-bold text-blue-600">
                ${reserved.price}
              </span>
            </div>
          </div>
        </div>
        <span className="font-md text-gray-600">
          Qty: {reserved.quantity} | Size: {reserved.size}
        </span>

        <span className="font-md text-gray-600">
          Address: {reserved.address}
        </span>

        {/* Action buttons */}
        <div className="mt-2 flex gap-2">
          <button
            className="flex flex-1 items-center justify-center gap-1 rounded-md bg-blue-600 px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <Eye size={14} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservedCardChat;
