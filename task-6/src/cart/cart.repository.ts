import { nanoid } from "nanoid";
import { CartEntity, CartItemEntity } from "./cart.model";

export const carts: CartEntity[] = [
  { id: "1", userId: "1", isDeleted: false, items: [] },
];

export async function getAllCarts(): Promise<CartEntity[]> {
  return carts;
}

export async function getCartById(id: string): Promise<CartEntity | null> {
  return carts.find((cart) => cart.id === id) || null;
}

export async function createCart(
  userId: string,
  items: CartItemEntity[] = []
): Promise<CartEntity> {
  const newCart: CartEntity = {
    id: nanoid(),
    userId,
    isDeleted: false,
    items,
  };
  carts.push(newCart);
  return newCart;
}

export async function updateCart(
  id: string,
  updatedCartData: Partial<CartEntity>
): Promise<CartEntity | null> {
  const cartIndex = carts.findIndex((cart) => cart.id === id);
  if (cartIndex === -1) {
    return null;
  }
  carts[cartIndex] = { ...carts[cartIndex], ...updatedCartData };
  return carts[cartIndex];
}

export async function deleteCart(id: string): Promise<void> {
  const cartIndex = carts.findIndex((cart) => cart.id === id);
  if (cartIndex !== -1) {
    carts.splice(cartIndex, 1);
  }
}
