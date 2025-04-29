import { products } from "../data/products";
import ProductCard from "../components/product-card";

export default function Favorites() {
  const favorites = products.filter((product) => product.isFavorite);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Favorite Products</h1>

      <div className="grid grid-cols-3 place-items-center gap-2">
        {favorites.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}
