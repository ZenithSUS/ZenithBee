import NearbyIcon from "../assets/product-filter/nearby.png";
import PromotionIcon from "../assets/product-filter/promotion.png";
import NewComersIcon from "../assets/product-filter/newcomers.png";
import BestSellerIcon from "../assets/product-filter/best-seller.png";
import TopRatedIcon from "../assets/product-filter/top-rated.png";
import AllIcon from "../assets/product-filter/all.png";
import { ProductsFilter } from "../utils/types";

export const productFilter: ProductsFilter[] = [
  {
    name: "Nearby",
    image: NearbyIcon,
    value: "nearby",
  },
  {
    name: "Promotion",
    image: PromotionIcon,
    value: "promotion",
  },
  {
    name: "Newcomers",
    image: NewComersIcon,
    value: "newcomers",
  },
  {
    name: "Best Seller",
    image: BestSellerIcon,
    value: "best-seller",
  },
  {
    name: "Top Rated",
    image: TopRatedIcon,
    value: "top-rated",
  },
  {
    name: "All",
    image: AllIcon,
    value: "all",
  },
];
