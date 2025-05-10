import { useGetProducts } from "../../hooks/products";
import { useState, useEffect } from "react";
import { Clock, Award, Truck, Phone } from "lucide-react";
import { OrderDetail, ShowProducts } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../../context/order";
import { initialData } from "../../utils/constants/order-detail";
import FoodCarousel from "../../components/food-carosel";
import Loading from "../../components/loading";
import OrderDetails from "../../components/order-details";

export default function Home() {
  const navigate = useNavigate();
  const {
    setCurrentOrderDetail,
    currentOrder,
    orderDetailOpen,
    setIsOrderDetailOpen,
    setCurrentOrder,
  } = useOrderContext();
  const { data: products, isLoading } = useGetProducts();
  const [featuredProducts, setFeaturedProducts] = useState<ShowProducts[]>([]);
  const [popularProducts, setPopularProducts] = useState<ShowProducts[]>([]);

  const checkDetails = (name: string) => {
    if (setCurrentOrder) {
      setCurrentOrder(name);
      setIsOrderDetailOpen(true);
    }
  };

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

  useEffect(() => {
    if (products) {
      const featured = products
        .filter((product) => Number(product.rating) > 4.5)
        .slice(0, 4);
      setFeaturedProducts(featured);

      const popular = [...products]
        .sort((a, b) => (Number(b.bought) || 0) - (Number(a.bought) || 0))
        .slice(0, 6);
      setPopularProducts(popular);
    }
  }, [products]);

  if (isLoading) return <Loading />;

  return (
    <div
      className={`grid w-full ${orderDetailOpen ? "md:grid-cols-1 lg:grid-cols-[65%_35%]" : "grid-cols-1"} mt-3 gap-6 pb-10`}
    >
      <div className="flex min-h-screen flex-col gap-3">
        {/* Hero Section with Carousel */}
        <div className="relative">
          <div className="h-[350px] w-full bg-black"></div>
          <div className="bg-opacity-40 absolute inset-0 flex flex-col items-center justify-center bg-black p-4 text-white">
            <h1 className="mb-2 text-center text-4xl font-bold md:text-5xl">
              Welcome to ZenithBee!
            </h1>
            <p className="max-w-2xl text-center text-lg md:text-xl">
              Delicious food delivered to your doorstep
            </p>
            <button
              className="bg-accent-color dark:bg-accent-dark-color hover:bg-accent-color/80 dark:hover:bg-accent-dark-color/80 mt-4 cursor-pointer rounded-full px-6 py-2 font-semibold text-black transition-all"
              onClick={() => navigate("/products")}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Quick Info Section */}
        <div className="bg-primary-color dark:bg-primary-dark-color grid grid-cols-1 gap-4 rounded-lg px-4 py-4 md:grid-cols-4">
          <div className="flex items-center gap-3 p-3">
            <Clock
              className="text-accent-color dark:text-accent-dark-color"
              size={24}
            />
            <div>
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-sm text-gray-600">30 min or less</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <Award
              className="text-accent-color dark:text-accent-dark-color"
              size={24}
            />
            <div>
              <h3 className="font-semibold">Best Quality</h3>
              <p className="text-sm text-gray-600">Fresh ingredients</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <Truck
              className="text-accent-color dark:text-accent-dark-color"
              size={24}
            />
            <div>
              <h3 className="font-semibold">Free Delivery</h3>
              <p className="text-sm text-gray-600">On orders over $25</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3">
            <Phone
              className="text-accent-color dark:text-accent-dark-color"
              size={24}
            />
            <div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-gray-600">Call us anytime</p>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="flex flex-col gap-3 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Items</h2>
            <button
              className="font-semibold hover:underline"
              onClick={() => navigate("/products")}
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-primary-color dark:bg-primary-dark-color overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={product.image || "/api/placeholder/300/200"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">{product.name}</h3>

                    <div className="flex items-center gap-0.5">
                      <p className="text-sm text-gray-400">{product.rating}</p>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <span className="font-semibold">${product.price}</span>
                    <button
                      className="bg-accent-color dark:bg-accent-dark-color hover:bg-accent-color/80 dark:hover:bg-accent-dark-color/80 cursor-pointer rounded-full px-3 py-1 text-xs font-semibold text-white transition duration-300 ease-in-out hover:scale-105"
                      onClick={() => checkDetails(product.name)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Products Carousel */}
        <div className="flex flex-col gap-3 px-4">
          <h2 className="text-2xl font-bold">Popular Items</h2>
          <div className="w-full overflow-x-auto py-6">
            <div className="flex space-x-6 px-4">
              {popularProducts.map((product, index) => (
                <FoodCarousel
                  key={index}
                  product={product}
                  checkDetails={checkDetails}
                />
              ))}
            </div>
          </div>
        </div>

        {/* All Products Section */}
        <div className="flex flex-col gap-3 px-4">
          <h2 className="text-2xl font-bold">Our Menu</h2>
          <div className="w-full overflow-x-auto py-6">
            <div className="flex space-x-6 px-4">
              {products?.map((product, index) => (
                <FoodCarousel
                  key={index}
                  product={product}
                  checkDetails={checkDetails}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-primary-color dark:bg-primary-dark-color flex flex-col gap-3 rounded-lg px-4 py-8">
          <h2 className="mb-6 text-center text-2xl font-bold">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-gray-600 italic">
                "The food is amazing and delivery is always on time. My go-to
                for lunch!"
              </p>
              <p className="mt-2 font-semibold text-black">- Sarah Johnson</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-gray-600 italic">
                "Best burgers in town! The ZenithBee special is incredible."
              </p>
              <p className="mt-2 font-semibold text-black">- Michael Chen</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-gray-600 italic">
                "Fresh ingredients and reasonable prices. I order weekly!"
              </p>
              <p className="mt-2 font-semibold text-black">- Alex Rodriguez</p>
            </div>
          </div>
        </div>

        {/* About/CTA Section */}
        <div className="bg-primary-color dark:bg-primary-dark-color rounded-lg px-4 py-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold">About ZenithBee</h2>
            <p className="mb-6">
              At ZenithBee, we're passionate about serving delicious,
              high-quality food that brings joy to our customers. Our chefs use
              only the freshest ingredients to create mouthwatering dishes that
              will satisfy your cravings.
            </p>
          </div>
        </div>
      </div>

      {orderDetailOpen && <OrderDetails setCurrentOrder={setCurrentOrder} />}
    </div>
  );
}
