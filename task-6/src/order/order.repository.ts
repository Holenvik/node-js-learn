import { nanoid } from "nanoid";
import { OrderEntity } from "./order.model";

const orders: OrderEntity[] = [];

export async function getAllOrders(): Promise<OrderEntity[]> {
  return orders;
}

export async function getOrderById(id: string): Promise<OrderEntity | null> {
  return orders.find((order) => order.id === id) || null;
}

export async function createOrder(
  orderData: OrderEntity
): Promise<OrderEntity> {
  const newOrder: OrderEntity = {
    ...orderData,
    id: nanoid(),
  };
  orders.push(newOrder);
  return newOrder;
}

export async function updateOrder(
  id: string,
  updatedOrderData: Partial<OrderEntity>
): Promise<OrderEntity | null> {
  const orderIndex = orders.findIndex((order) => order.id === id);
  if (orderIndex === -1) {
    return null;
  }
  orders[orderIndex] = { ...orders[orderIndex], ...updatedOrderData };
  return orders[orderIndex];
}

export async function deleteOrder(id: string): Promise<void> {
  const orderIndex = orders.findIndex((order) => order.id === id);
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
  }
}
