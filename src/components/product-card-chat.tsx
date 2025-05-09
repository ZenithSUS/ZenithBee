import { useState } from "react";
import { Products } from "../utils/types";
import { ProductModal } from "./modals/product";
import { ShoppingCart, Eye } from "lucide-react";
import { useOrderContext } from "../context/order";

const ProductCardChat = ({ product }: { product: Products }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setCurrentOrder, setIsOrderDetailOpen } = useOrderContext();

  const orderProduct = (name: string) => {
    if (setCurrentOrder) {
      setCurrentOrder(name);
      setIsOrderDetailOpen(true);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={product}
      />
      <div className="relative h-36 w-full overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="line-clamp-2 text-sm font-medium text-gray-800">
              {product.name}
            </h3>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm font-bold text-blue-600">
                {product.price}
              </span>
            </div>
          </div>
          <div className="font-md text-gray-500">{product.foodType}</div>

          {/* Rating if available */}
          {product.rating && (
            <div className="mt-1 flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(Number(product.rating)) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-2 flex gap-2">
          <button
            className="flex flex-1 items-center justify-center gap-1 rounded-md bg-blue-600 px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <Eye size={14} />
            <span>Details</span>
          </button>
          <button
            className="flex items-center justify-center rounded-md bg-gray-100 px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
            onClick={() => orderProduct(product.name)}
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardChat;
