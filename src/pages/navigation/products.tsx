import { useState, useEffect } from "react";
import { useGetProducts } from "../../hooks/products";
import { productFilter } from "../../data/product-filter";
import { ShowProducts } from "../../utils/types";
import HeroImg from "../../assets/ui/hero.png";
import SearchBar from "../../components/searchbar";
import ProductCard from "../../components/product-card";
import OrderDetails from "../../components/order-details";
import Loading from "../../components/loading";

export default function Products() {
  const [currentOrder, setCurrentOrder] = useState<string>("");
  const [orderDetail, setOrderDetail] = useState<ShowProducts | null>(null);
  const { data: products, isLoading } = useGetProducts();

  useEffect(() => {
    if (currentOrder && products && products.length > 0) {
      const data = products.find((prod) => prod.name === currentOrder);
      setOrderDetail(data || null);
    } else {
      setOrderDetail(null);
    }
  }, [currentOrder, products]);

  if (isLoading) return <Loading />;

  return (
    <div
      className={`grid w-full ${orderDetail ? "grid-cols-[65%_35%]" : "grid-cols-1"} mt-3 gap-6`}
    >
      <div className="flex min-h-screen flex-col gap-3">
        <SearchBar />

        {/*Hero Element*/}
        <div className="relative h-fit w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="bg-accent-color dark:bg-accent-dark-color clip-path-polygon flex h-full w-[50%] flex-col items-center justify-center gap-1 p-5">
              <h1 className="font-sans text-3xl font-bold">30% Off</h1>
              <p className="text-2xl font-bold text-white">Budget Meal</p>
            </div>
          </div>
          <img src={HeroImg} alt="hero" className="h-60 w-full object-cover" />
        </div>

        {/* Product Filter*/}
        <div className="bg-primary-color dark:bg-primary-dark-color sticky top-0 z-[20] flex w-full items-center justify-baseline gap-10 overflow-auto px-2 py-4 md:gap-5">
          {productFilter.map((filter, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-3 md:gap-1"
            >
              <img
                src={filter.image}
                alt={filter.name}
                className="w-6 dark:brightness-100 dark:invert"
              />
              <h2 className="text-md text-center">{filter.name}</h2>
            </div>
          ))}
        </div>

        {/*Products */}
        <div className="flex flex-col place-items-center gap-2 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {products?.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              setCurrentOrder={setCurrentOrder}
            />
          ))}
        </div>
      </div>

      {orderDetail && (
        <OrderDetails
          order={{
            ...orderDetail,
            tmpId: "temp-id",
            address: "",
            size: "",
            quantity: 1,
            subtotal: 0,
            user: "",
            product: orderDetail,
          }}
          setCurrentOrder={setCurrentOrder}
        />
      )}
    </div>
  );
}
