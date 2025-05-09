import { useGetProducts } from "../../hooks/products";
import FoodCarousel from "../../components/food-carosel";

import Loading from "../../components/loading";
import { useState, useEffect } from "react";
import { Clock, Award, Truck, Phone } from "lucide-react";
import { ShowProducts } from "../../utils/types";

export default function Home() {
  const { data: products, isLoading } = useGetProducts();
  const [featuredProducts, setFeaturedProducts] = useState<ShowProducts[]>([]);
  // const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const featured = products
        .filter((product) => Number(product.rating) > 4.5)
        .slice(0, 4);
      setFeaturedProducts(featured);

      // const popular = [...products]
      //   .sort((a, b) => (b.sales || 0) - (a.sales || 0))
      //   .slice(0, 6);
      // setPopularProducts(popular);
    }
  }, [products]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-6 pb-10">
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
          <button className="mt-4 rounded-full bg-yellow-500 px-6 py-2 font-semibold text-black transition-all hover:bg-yellow-600">
            Order Now
          </button>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="bg-primary-color dark:bg-primary-dark-color grid grid-cols-1 gap-4 rounded-lg px-4 py-4 md:grid-cols-4">
        <div className="flex items-center gap-3 p-3">
          <Clock className="text-yellow-500" size={24} />
          <div>
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-sm text-gray-600">30 min or less</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3">
          <Award className="text-yellow-500" size={24} />
          <div>
            <h3 className="font-semibold">Best Quality</h3>
            <p className="text-sm text-gray-600">Fresh ingredients</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3">
          <Truck className="text-yellow-500" size={24} />
          <div>
            <h3 className="font-semibold">Free Delivery</h3>
            <p className="text-sm text-gray-600">On orders over $25</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3">
          <Phone className="text-yellow-500" size={24} />
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
          <button className="font-semibold text-yellow-500 hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
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
                <h3 className="font-bold">{product.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-yellow-500">
                    ${product.price}
                  </span>
                  <button className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-black hover:bg-yellow-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Products Carousel
      <div className="flex flex-col gap-3 px-4">
        <h2 className="text-2xl font-bold">Popular Items</h2>
        <div className="w-full overflow-x-auto py-6">
          <div className="flex space-x-6 px-4">
            {popularProducts.map((product, index) => (
              <FoodCarousel key={index} product={product} />
            ))}
          </div>
        </div>
      </div> */}

      {/* All Products Section */}
      <div className="flex flex-col gap-3 px-4">
        <h2 className="text-2xl font-bold">Our Menu</h2>
        <div className="w-full overflow-x-auto py-6">
          <div className="flex space-x-6 px-4">
            {products?.map((product, index) => (
              <FoodCarousel key={index} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-primary-color dark:bg-primary-dark-color rounded-lg px-4 py-8">
        <h2 className="mb-6 text-center text-2xl font-bold">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-gray-600 italic">
              "The food is amazing and delivery is always on time. My go-to for
              lunch!"
            </p>
            <p className="mt-2 font-semibold">- Sarah Johnson</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-gray-600 italic">
              "Best burgers in town! The ZenithBee special is incredible."
            </p>
            <p className="mt-2 font-semibold">- Michael Chen</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-gray-600 italic">
              "Fresh ingredients and reasonable prices. I order weekly!"
            </p>
            <p className="mt-2 font-semibold">- Alex Rodriguez</p>
          </div>
        </div>
      </div>

      {/* About/CTA Section */}
      <div className="bg-primary-color dark:bg-primary-dark-color rounded-lg px-4 py-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold">About ZenithBee</h2>
          <p className="mb-6">
            At ZenithBee, we're passionate about serving delicious, high-quality
            food that brings joy to our customers. Our chefs use only the
            freshest ingredients to create mouthwatering dishes that will
            satisfy your cravings.
          </p>
        </div>
      </div>
    </div>
  );
}
