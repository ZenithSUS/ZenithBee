import { OrderDetail } from "../types";

export const initialData: OrderDetail = {
  $id: "",
  name: "",
  description: "",
  image: "",
  price: "",
  rating: "",
  foodType: "",
  isFavorite: false,
  tmpId: "",
  quantity: 0,
  size: "",
  address: "",
  subtotal: 0,
  user: "",
  product: {
    $id: "",
    name: "",
    description: "",
    image: "",
    price: "",
    rating: "",
    foodType: "",
    isFavorite: false,
  },
};
