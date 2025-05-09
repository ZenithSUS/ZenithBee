import { useEffect } from "react";
import { useGetProducts } from "../../hooks/products";
import HeroImg from "../../assets/ui/hero.png";
import ZenitBeeAI from "../../components/zenithbee-ai";
import ProductCard from "../../components/product-card";
import OrderDetails from "../../components/order-details";
import Loading from "../../components/loading";
import { useOrderContext } from "../../context/order";
import { initialData } from "../../utils/constants/order-detail";
import { OrderDetail } from "../../utils/types";

export default function Products() {
  const {
    setCurrentOrderDetail,
    currentOrder,
    orderDetailOpen,
    setIsOrderDetailOpen,
    setCurrentOrder,
  } = useOrderContext();

  const { data: products, isLoading } = useGetProducts();

  useEffect(() => {
    if (currentOrder && products && products.length > 0) {
      const data = products.find((prod) => prod.name === currentOrder);
      if (data) {
        setCurrentOrderDetail(data as OrderDetail);
      } else {
        setCurrentOrderDetail(initialData);
      }
    }
  }, [currentOrder, products, setCurrentOrderDetail]);

  if (isLoading) return <Loading />;

  return (
    <div
      className={`grid w-full ${orderDetailOpen ? "md:grid-cols-[65%_35%]" : "grid-cols-1"} mt-3 gap-6`}
    >
      <div className="flex min-h-screen flex-col gap-3">
        <ZenitBeeAI />

        {/*Hero Element*/}
        <div className="relative h-fit w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="bg-accent-color dark:bg-accent-dark-color clip-path-polygon flex h-full w-[50%] flex-col items-center justify-center gap-1 p-5">
              <h1 className="font-sans text-2xl font-bold md:text-3xl">
                30% Off
              </h1>
              <p className="text-xl font-bold text-white md:text-2xl">
                Budget Meal
              </p>
            </div>
          </div>
          <img
            src={HeroImg}
            alt="hero"
            className="h-40 w-full object-cover md:h-60"
          />
        </div>

        {/*Products */}
        <div className="flex flex-col place-items-center gap-2 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {products?.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              setCurrentOrder={setCurrentOrder}
              setIsOrderDetailOpen={setIsOrderDetailOpen}
            />
          ))}
        </div>
      </div>

      {orderDetailOpen && <OrderDetails setCurrentOrder={setCurrentOrder} />}
    </div>
  );
}
