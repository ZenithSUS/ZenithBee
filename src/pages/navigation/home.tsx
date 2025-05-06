import { useGetProducts } from "../../hooks/products";
import FoodCarousel from "../../components/food-carosel";
import HeroCarosel from "../../components/hero-carosel";
import Loading from "../../components/loading";

export default function Home() {
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) return <Loading />;
  return (
    <div className="mt-3 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Welcome to ZenithBee!</h1>

      <HeroCarosel />

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Try Our Delicious Products</h1>

        <div className="w-full overflow-x-auto py-6">
          <div className="flex space-x-6 px-4">
            {products?.map((product, index) => (
              <FoodCarousel key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
