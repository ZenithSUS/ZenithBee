import { useGetFavoriteByUser } from "../../hooks/favorites";
import ProductCard from "../../components/product-card";
import Loading from "../../components/loading";

export default function Favorites() {
  const userId = JSON.parse(localStorage.getItem("id") as string);
  const { data: products, isLoading } = useGetFavoriteByUser(userId);

  if (isLoading) return <Loading />;

  const favorites = products?.filter((product) => product.user.$id === userId);

  return (
    <div className="mt-3 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Favorite Products</h1>

      <div className="flex flex-col place-items-center gap-2 md:grid md:grid-cols-2 lg:grid-cols-3">
        {favorites?.map((fav) => (
          <ProductCard key={fav.product.$id} product={fav.product} />
        ))}
      </div>

      {favorites?.length === 0 && (
        <h1 className="text-2xl font-bold">No Favorites Found</h1>
      )}
    </div>
  );
}
