import { CartEntity, CartItemEntity } from "./cart.model";
import * as cartEntityRepository from "./cart.repository";

export async function getAllCarts(): Promise<CartEntity[]> {
  return cartEntityRepository.getAllCarts();
}

export async function getCartById(id: string): Promise<CartEntity | null> {
  return cartEntityRepository.getCartById(id);
}

export async function createCart(
  userId: string,
  items: CartItemEntity[] = []
): Promise<CartEntity> {
  return cartEntityRepository.createCart(userId, items);
}

export async function updateCart(
  id: string,
  updatedCartData: Partial<CartEntity>
): Promise<CartEntity | null> {
  return cartEntityRepository.updateCart(id, updatedCartData);
}

export async function deleteCart(id: string): Promise<void> {
  return cartEntityRepository.deleteCart(id);
}
