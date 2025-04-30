import { useState } from "react";
import { ShowProducts } from "../utils/types";
import { ProductModal } from "./modals";

type ProductType = {
  product: ShowProducts;
  setCurrentOrder?: (name: string) => void;
};

export default function ProductCard({ product, setCurrentOrder }: ProductType) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const checkDetails = (name: string) => {
    if (setCurrentOrder) {
      setCurrentOrder(name);
    }
  };

  return (
    <>
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={product}
      />
      <div
        className={`card bg-base-100 card-md h-96 w-[calc(100%-1rem)] shadow-sm`}
      >
        <div className="card-header">
          <img
            src={product.image}
            alt={product.name}
            className="h-52 w-full cursor-pointer rounded-md object-cover transition duration-300 ease-in-out hover:scale-105"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </div>
        <div className="card-body">
          <div className="flex w-full items-center justify-between">
            <h2 className="card-title">{product.name}</h2>
            <p className="text-end text-2xl font-bold">${product.price}</p>
          </div>
          <p className="text-gray-400">{product.foodType}</p>
          <div className="card-actions justify-end">
            {setCurrentOrder && (
              <button
                className="bg-accent-color cursor-pointer rounded-md p-2 font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
                onClick={() => checkDetails(product.name)}
              >
                Order
              </button>
            )}
            <button
              className="bg-accent-color cursor-pointer rounded-md p-2 font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              View Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
