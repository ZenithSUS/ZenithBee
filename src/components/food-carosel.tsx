import { ProductModal } from "./modals/product";
import { useState } from "react";
import { ShowProducts } from "../utils/types";

type CarsoselType = {
  product: ShowProducts;
  checkDetails: (name: string) => void;
};

export default function FoodCarousel({ product, checkDetails }: CarsoselType) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-primary-color dark:bg-primary-dark-color w-64 flex-none rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-lg">
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={product}
      />
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full rounded-t-2xl object-cover"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <div className="flex items-center gap-0.5">
            <p className="text-sm text-gray-400">{product.rating}</p>
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-md font-semibold">$ {product.price}</p>
            <p className="text-sm text-gray-400">{product.foodType}</p>
          </div>

          <button
            className="bg-accent-color dark:bg-accent-dark-color cursor-pointer rounded-md p-2 text-sm font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
            onClick={() => checkDetails(product.name)}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
