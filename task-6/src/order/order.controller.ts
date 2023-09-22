import { Request, Response } from "express";
import * as orderEntityService from "./order.service";

export async function getAllOrders(req: Request, res: Response): Promise<void> {
  const orders = await orderEntityService.getAllOrders();
  res.json(orders);
}

export async function getOrderById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const order = await orderEntityService.getOrderById(id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(order);
}

export async function createOrder(req: Request, res: Response): Promise<void> {
  const orderData = req.body;
  const newOrder = await orderEntityService.createOrder(orderData);
  res.status(201).json(newOrder);
}

export async function updateOrder(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const updatedOrderData = req.body;
  const updatedOrder = await orderEntityService.updateOrder(
    id,
    updatedOrderData
  );
  if (!updatedOrder) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(updatedOrder);
}

export async function deleteOrder(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  await orderEntityService.deleteOrder(id);
  res.json({ message: "Order deleted successfully" });
}
