export type SidebarNav = {
  name: string;
  image: string;
  navigate: string;
};

export type Products = {
  name: string;
  image: string;
  price: string;
  foodType: string;
  isFavorite: boolean;
};

export type ProductsFilter = {
  name: string;
  image: string;
  value: string;
};

export type OrderDetail = {
  name: string;
  size?: string;
  topping?: string;
  price: string;
  quantity?: number;
  subtotal?: number;
  image: string;
};
