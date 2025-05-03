import { useState, useTransition } from "react";
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
};

export default function ProductCard({ product, setCurrentOrder }: ProductType) {
  const userId = JSON.parse(localStorage.getItem("id") as string);
  const { data: favorite, isLoading } = useGetFavoriteByUser(userId);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  if (isLoading) return <Loading />;

  const checkDetails = (name: string) => {
    if (setCurrentOrder) {
      setCurrentOrder(name);
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
        className={`card bg-base-100 card-md h-96 w-[calc(100%-1rem)] text-black shadow-sm dark:text-white`}
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

          <p className="text-gray-400">{product.foodType}</p>

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
