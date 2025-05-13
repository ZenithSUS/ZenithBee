import { useEffect, useState } from "react";
import { useGetProducts } from "../../hooks/products";
import { useOrderContext } from "../../context/order";
import { initialData } from "../../utils/constants/order-detail";
import { OrderDetail, ShowProducts } from "../../utils/types";
import { productFilter } from "../../data/product-filter";
import {
  sortByRating,
  sortByBought,
  sortByNewComer,
  sortByPrice,
} from "../../utils/functions/product-filter";
import HeroImg from "../../assets/ui/hero.png";
import ZenitBeeAI from "../../components/zenithbee-ai";
import ProductCard from "../../components/product-card";
import OrderDetails from "../../components/order-details";
import Loading from "../../components/loading";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const {
    setCurrentOrderDetail,
    currentOrder,
    orderDetailOpen,
    setIsOrderDetailOpen,
    setCurrentOrder,
  } = useOrderContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: allProducts, isLoading } = useGetProducts();
  const [filteredProducts, setFilteredProducts] = useState<ShowProducts[]>([]);
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get("filter") || "all",
  );

  const filterProducts = (filter: string) => {
    if (!allProducts || allProducts.length === 0) return [];

    let result: ShowProducts[] = [];
    switch (filter) {
      case "top-rated":
        result = sortByRating([...allProducts]);
        break;
      case "best-seller":
        result = sortByBought([...allProducts]);
        break;
      case "newcomers":
        result = sortByNewComer([...allProducts]);
        break;
      case "prices":
        result = sortByPrice([...allProducts]);
        break;
      case "all":
      default:
        result = [...allProducts];
    }

    setFilteredProducts(result);
    setActiveFilter(filter);
  };

  const handleFilter = (value: string) => {
    setSearchParams((params) => {
      params.set("filter", value);
      return params;
    });
    filterProducts(searchParams.get("filter")!);
  };

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      filterProducts(activeFilter);
    }
  }, [allProducts]);

  useEffect(() => {
    if (currentOrder && allProducts && allProducts.length > 0) {
      const data = allProducts.find((prod) => prod.name === currentOrder);
      if (data) {
        setCurrentOrderDetail(data as OrderDetail);
      } else {
        setCurrentOrderDetail(initialData);
      }
    }
  }, [currentOrder, allProducts, setCurrentOrderDetail]);

  if (isLoading) return <Loading />;

  return (
    <div
      className={`grid w-full ${orderDetailOpen ? "lg:grid-cols-[65%_35%]" : "grid-cols-1"} mt-3 gap-6`}
    >
      <div className="flex min-h-screen flex-col gap-3">
        <ZenitBeeAI />

        {/*Hero Element*/}
        <div className="relative h-fit w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="bg-accent-color dark:bg-accent-dark-color clip-path-polygon flex h-full w-[50%] flex-col items-center justify-center gap-1 p-5 text-center">
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

        {/*Product Filters*/}
        <div className="bg-primary-color dark:bg-primary-dark-color sticky top-0 z-20 flex w-full gap-8 overflow-auto p-5">
          {productFilter.map((f, index) => (
            <button
              key={index}
              className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg px-5 py-1 transition-all ${activeFilter === f.value ? "border-b-accent-color dark:border-b-accent-dark-color border-b-4" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              onClick={() => handleFilter(f.value)}
            >
              <img
                src={f.image}
                alt={f.name}
                className="h-8 w-8 dark:brightness-100 dark:invert-100"
              />
              <p className="text-md font-medium overflow-ellipsis">{f.name}</p>
            </button>
          ))}
        </div>

        {/*Products */}
        <div className="flex flex-col place-items-center gap-2 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
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
