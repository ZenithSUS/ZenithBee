import React, { useState, useTransition } from "react";
import {
  useAddToFavorite,
  useGetFavoriteByUser,
  useRemoveFromFavorite,
} from "../hooks/favorites";
import { ShowProducts } from "../utils/types";
import { ProductModal } from "./modals/product";
import { useQueryClient } from "@tanstack/react-query";
import Favorite from "../assets/ui/fav-enable.png";
import UnFavorite from "../assets/ui/fav-disable.png";
import Loading from "./loading";

type ProductType = {
  product: ShowProducts;
  setCurrentOrder?: (name: string) => void;
  setIsOrderDetailOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductCard({
  product,
  setCurrentOrder,
  setIsOrderDetailOpen,
}: ProductType) {
  const userId = JSON.parse(localStorage.getItem("id") as string);
  const { data: favorite, isLoading } = useGetFavoriteByUser(userId);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  if (isLoading) return <Loading />;

  const checkDetails = (name: string) => {
    if (setCurrentOrder) {
      setCurrentOrder(name);
      if (setIsOrderDetailOpen) {
        setIsOrderDetailOpen(true);
      }
    }
  };

  const handleFavorite = () => {
    if (isFavorite) {
      startTransition(async () => {
        await useRemoveFromFavorite(isFavorite.$id);
        await queryClient.invalidateQueries({ queryKey: ["favorites"] });
      });
    } else {
      startTransition(async () => {
        await useAddToFavorite({ user: userId, product: product.$id });
        await queryClient.invalidateQueries({ queryKey: ["favorites"] });
      });
    }
  };

  const isFavorite =
    favorite?.find(
      (favorite) =>
        favorite.user.$id === userId && favorite.product.$id === product.$id,
    ) || false;

  return (
    <>
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={product}
      />
      <div
        className={`card bg-primary-color dark:bg-primary-dark-color card-md h-96 w-[calc(100%-1rem)] text-black shadow-sm dark:text-white`}
      >
        <div className="card-header relative">
          <button
            type="button"
            disabled={isPending}
            onClick={handleFavorite}
            className="absolute top-2 right-2 z-10 rounded-full bg-black p-2 transition duration-300 ease-in-out hover:scale-105 disabled:opacity-50"
          >
            <img
              src={isFavorite ? Favorite : UnFavorite}
              alt="favorite"
              className="h-6 w-6 cursor-pointer transition duration-300 ease-in-out hover:scale-105 dark:brightness-100 dark:invert"
            />
          </button>
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

          <div className="flex w-full items-center justify-between">
            <p className="text-gray-400">{product.foodType}</p>
            <div className="flex items-center gap-0.5">
              <p className="text-sm text-gray-400">{product.rating}</p>
              <svg
                className="h-7 w-7 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          <div className="card-actions justify-end">
            {setCurrentOrder && (
              <button
                className="bg-accent-color dark:bg-accent-dark-color cursor-pointer rounded-md p-2 font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
                onClick={() => checkDetails(product.name)}
              >
                Order
              </button>
            )}
            <button
              className="bg-accent-color dark:bg-accent-dark-color cursor-pointer rounded-md p-2 font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
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
