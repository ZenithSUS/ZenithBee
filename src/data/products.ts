import { ShowProducts } from "../utils/types";
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

export const products: ShowProducts[] = [
  {
    name: "Margherita Pizza",
    image: MarghetitaPizza,
    price: "12.99",
    foodType: "Italian",
    isFavorite: true,
    description:
      "Classic Italian pizza with fresh tomato sauce, mozzarella cheese, and basil leaves on a thin, crispy crust.",
  },
  {
    name: "Beef Burger",
    image: BeefBurger,
    price: "9.50",
    foodType: "American",
    isFavorite: false,
    description:
      "Juicy grilled beef patty topped with lettuce, tomato, onions, and cheese on a toasted sesame seed bun.",
  },
  {
    name: "Caesar Salad",
    image: CeasarSalad,
    price: "7.95",
    foodType: "Salad",
    isFavorite: true,
    description:
      "Crisp romaine lettuce tossed with creamy Caesar dressing, crunchy croutons, and shaved parmesan cheese.",
  },
  {
    name: "Chicken Tikka Masala",
    image: ChickTikkaMasala,
    price: "10.50",
    foodType: "Indian",
    isFavorite: false,
    description:
      "Tender chicken pieces marinated in spices, grilled and served in a rich, creamy tomato sauce with aromatic basmati rice.",
  },
  {
    name: "Vegetable Sushi Roll",
    image: VegetableSushiRoll,
    price: "9.25",
    foodType: "Japanese",
    isFavorite: true,
    description:
      "Fresh cucumber, avocado, and carrot wrapped in seasoned rice and nori seaweed, served with soy sauce and wasabi.",
  },
  {
    name: "Chocolate Brownies",
    image: ChocolateBrownies,
    price: "5.99",
    foodType: "Dessert",
    isFavorite: false,
    description:
      "Rich, fudgy chocolate brownie with a perfectly crisp top layer, studded with chocolate chips and drizzled with chocolate sauce.",
  },
  {
    name: "Pad Thai",
    image: PadThai,
    price: "7.75",
    foodType: "Thai",
    isFavorite: true,
    description:
      "Stir-fried rice noodles with eggs, bean sprouts, and green onions in a sweet and tangy tamarind sauce, topped with crushed peanuts.",
  },
  {
    name: "Greek Yogurt Bowl",
    image: GreekYogartBowl,
    price: "8.50",
    foodType: "Breakfast",
    isFavorite: false,
    description:
      "Creamy Greek yogurt topped with fresh berries, honey, granola, and a sprinkle of chia seeds for a healthy, protein-rich start to your day.",
  },
  {
    name: "Fish and Chips",
    image: FishAndChips,
    price: "10.99",
    foodType: "British",
    isFavorite: true,
    description:
      "Flaky cod fillet in a golden beer batter served with thick-cut crispy fries, tartar sauce, and a lemon wedge.",
  },
  {
    name: "Chicken Quesadilla",
    image: ChickenQuesadilla,
    price: "9.25",
    foodType: "Mexican",
    isFavorite: false,
    description:
      "Grilled flour tortilla filled with seasoned chicken, melted cheese, peppers, and onions, served with salsa and sour cream.",
  },
];
