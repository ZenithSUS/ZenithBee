export type SidebarNav = {
  name: string;
  image: string;
  navigate: string;
};

export type CaroselSchema = {
  image: string;
  name: string;
};

export type Products = {
  name: string;
  description: string;
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

export type OrderDetail = Products & {
  size?: string;
  topping?: string;
  quantity?: number;
  subtotal?: number;
};

export type Users = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
  email: string;
  password: string;
};

export type AddUser = Omit<Users, "$createdAt" | "$updatedAt">;
