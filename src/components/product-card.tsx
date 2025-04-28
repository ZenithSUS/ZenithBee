import { Products } from "../utils/types";

type ProductType = {
  product: Products;
  setCurrentOrder: (name: string) => void;
  order: string;
};

export default function ProductCard({
  product,
  setCurrentOrder,
  order,
}: ProductType) {
  const checkDetails = (name: string) => {
    setCurrentOrder(name);
  };

  return (
    <div
      className={`card bg-base-100 card-md h-96 ${order !== "" ? "w-65" : "w-full"} shadow-sm`}
    >
      <div className="card-header">
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full rounded-md object-cover"
        />
      </div>
      <div className="card-body">
        <div className="flex w-full items-center justify-between">
          <h2 className="card-title">{product.name}</h2>
          <p className="text-end text-2xl font-bold">${product.price}</p>
        </div>
        <p className="text-gray-400">{product.foodType}</p>
        <div className="card-actions justify-end">
          <button
            className="bg-accent-color cursor-pointer rounded-md p-2 font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
            onClick={() => checkDetails(product.name)}
          >
            Check Details
          </button>
        </div>
      </div>
    </div>
  );
}
