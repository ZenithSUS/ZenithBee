import { products } from "../data/products";

export default function FoodCarousel() {
  return (
    <div className="w-full overflow-x-auto py-6">
      <div className="flex space-x-6 px-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="w-64 flex-none rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full rounded-t-2xl object-cover"
            />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{product.name}</h2>
              </div>
              <p className="text-gray-600">{product.price}</p>
              <p className="text-sm text-gray-400">{product.foodType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
