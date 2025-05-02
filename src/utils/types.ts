export type SidebarNav = {
  name: string;
  image: string;
  navigate: string;
};

export type AppwriteError = {
  code: number;
  message: string;
};

export type CaroselSchema = {
  image: string;
  name: string;
};

export type Users = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  profileId: string;
};

export type AddUser = Omit<Users, "$id" | "$createdAt" | "$updatedAt"> & {
  userId: string;
};

export type Products = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  description: string;
  image: string;
  price: string;
  foodType: string;
  isFavorite: boolean;
};

export type AddProduct = Omit<Products, "$id" | "$createdAt" | "$updatedAt">;

export type ShowProducts = Omit<Products, "$createdAt" | "$updatedAt">;

export type ProductsFilter = {
  name: string;
  image: string;
  value: string;
};

export type OrderDetail = ShowProducts & {
  tmpId: string;
  size: string;
  quantity: number;
  subtotal: number;
  user: string;
  product: ShowProducts;
};

export type Favorite = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  user: Users;
  product: Products;
};

export type AddFavorite = {
  user: string;
  product: string;
};

export type Reserved = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  user: Users;
  product: Products;
  quantity: number | string;
  size: string;
  price: number | string;
};

export type AddReserved = Omit<
  Reserved,
  "$id" | "$createdAt" | "$updatedAt" | "user" | "product" | "price"
> & { user: string; product: string; price: string };
