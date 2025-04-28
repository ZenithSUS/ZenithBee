import { Products as ProductsType } from "../utils/types";
import MarghetitaPizza from "../assets/products/margherita-pizza.png";
import BeefBurger from "../assets/products/beef-burger.png";
import CeasarSalad from "../assets/products/ceasar-salad.png";
import ChickTikkaMasala from "../assets/products/chicken-tikka-masala.png";
import VegetableSushiRoll from "../assets/products/vegetable-sushi-roll.jpg";
import ChocolateBrownies from "../assets/products/chocolate-brownies.jpg";
import PadThai from "../assets/products/pad-thai.jpg";
import GreekYogartBowl from "../assets/products/greek-yogurt-bowl.jpg";
import FishAndChips from "../assets/products/fish-and-chips.jpg";
import ChickenQuesadilla from "../assets/products/chicken-quesadillas.jpg";

export const products: ProductsType[] = [
  {
    name: "Margherita Pizza",
    image: MarghetitaPizza,
    price: "12.99",
    foodType: "Italian",
    isFavorite: true,
  },
  {
    name: "Beef Burger",
    image: BeefBurger,
    price: "9.50",
    foodType: "American",
    isFavorite: false,
  },
  {
    name: "Caesar Salad",
    image: CeasarSalad,
    price: "7.95",
    foodType: "Salad",
    isFavorite: true,
  },
  {
    name: "Chicken Tikka Masala",
    image: ChickTikkaMasala,
    price: "14.50",
    foodType: "Indian",
    isFavorite: false,
  },
  {
    name: "Vegetable Sushi Roll",
    image: VegetableSushiRoll,
    price: "11.25",
    foodType: "Japanese",
    isFavorite: true,
  },
  {
    name: "Chocolate Brownie",
    image: ChocolateBrownies,
    price: "5.99",
    foodType: "Dessert",
    isFavorite: false,
  },
  {
    name: "Pad Thai",
    image: PadThai,
    price: "13.75",
    foodType: "Thai",
    isFavorite: true,
  },
  {
    name: "Greek Yogurt Bowl",
    image: GreekYogartBowl,
    price: "8.50",
    foodType: "Breakfast",
    isFavorite: false,
  },
  {
    name: "Fish and Chips",
    image: FishAndChips,
    price: "10.99",
    foodType: "British",
    isFavorite: true,
  },
  {
    name: "Chicken Quesadilla",
    image: ChickenQuesadilla,
    price: "9.25",
    foodType: "Mexican",
    isFavorite: false,
  },
];
