import { useGetProducts } from "../../hooks/products";
import ProductCard from "../../components/product-card";
import Loading from "../../components/loading";

export default function Favorites() {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <Loading />;

  const favorites = products?.filter((product) => product.isFavorite);

  return (
    <div className="mt-3 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Favorite Products</h1>

      <div className="flex flex-col place-items-center gap-2 md:grid md:grid-cols-2 lg:grid-cols-3">
        {favorites?.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}
