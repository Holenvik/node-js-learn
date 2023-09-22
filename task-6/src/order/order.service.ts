import { OrderEntity } from "./order.model";
import * as orderEntityRepository from "./order.repository";

export async function getAllOrders(): Promise<OrderEntity[]> {
  return orderEntityRepository.getAllOrders();
}

export async function getOrderById(id: string): Promise<OrderEntity | null> {
  return orderEntityRepository.getOrderById(id);
}

export async function createOrder(
  orderData: OrderEntity
): Promise<OrderEntity> {
  return orderEntityRepository.createOrder(orderData);
}

export async function updateOrder(
  id: string,
  updatedOrderData: Partial<OrderEntity>
): Promise<OrderEntity | null> {
  return orderEntityRepository.updateOrder(id, updatedOrderData);
}

export async function deleteOrder(id: string): Promise<void> {
  return orderEntityRepository.deleteOrder(id);
}
