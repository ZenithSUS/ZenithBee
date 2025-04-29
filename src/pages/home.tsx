import { Link } from "react-router-dom";
import FoodCarousel from "../components/food-carosel";
import HeroCarosel from "../components/hero-carosel";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Welcome to ZenithBee!</h1>

      <HeroCarosel />

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Try Our Delicious Products</h1>
        <Link to="/orders">
          <FoodCarousel />
        </Link>
      </div>
    </div>
  );
}
