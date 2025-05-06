import { ProductModal } from "./modals/product";
import { useState } from "react";
import { ShowProducts } from "../utils/types";

type CarsoselType = {
  product: ShowProducts;
};

export default function FoodCarousel({ product }: CarsoselType) {
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
        </div>
        <p className="text-gray-600">{product.price}</p>
        <p className="text-sm text-gray-400">{product.foodType}</p>
      </div>
    </div>
  );
}
