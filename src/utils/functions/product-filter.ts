import { ShowProducts } from "../types";

export const sortByRating = (product: ShowProducts[]) => {
  return product.sort((a, b) => Number(b.rating) - Number(a.rating));
};

export const sortByBought = (product: ShowProducts[]) => {
  return product.sort((a, b) => Number(b.bought) - Number(a.bought));
};

export const sortByNewComer = (product: ShowProducts[]) => {
  return product.sort((a, b) => {
    if (a.$createdAt && b.$createdAt) {
      return (
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
      );
    }
    return Number(b.$id) - Number(a.$id);
  });
};

export const sortByPrice = (product: ShowProducts[]) => {
  return product.sort((a, b) => Number(a.price) - Number(b.price));
};
