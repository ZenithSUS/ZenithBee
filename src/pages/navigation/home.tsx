import { Link } from "react-router-dom";
import FoodCarousel from "../../components/food-carosel";
import HeroCarosel from "../../components/hero-carosel";

export default function Home() {
  return (
    <div className="mt-3 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Welcome to ZenithBee!</h1>

      <HeroCarosel />

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Try Our Delicious Products</h1>
        <Link to="/products">
          <FoodCarousel />
        </Link>
      </div>
    </div>
  );
}
