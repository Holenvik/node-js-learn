import { Request, Response } from "express";
import * as cartEntityService from "./cart.service";
import { carts } from "./cart.repository";
import Joi from "joi";

const updateCartSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.object({
          id: Joi.string().required(),
          title: Joi.string().required(),
          description: Joi.string().required(),
          price: Joi.number().min(0).required(),
        }).required(),
        count: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

export async function getAllCarts(req: Request, res: Response): Promise<void> {
  const carts = await cartEntityService.getAllCarts();
  res.json(carts);
}

export async function getCartById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const cart = await cartEntityService.getCartById(id);
  if (!cart) {
    res.status(404).json({ error: "Cart not found" });
    return;
  }
  res.json(cart);
}

export async function createCart(req: Request, res: Response): Promise<void> {
  const { userId, items } = req.body;

  const isCartExist = carts.find((cart) => cart.userId === userId);

  if (isCartExist) {
    res.status(400).json({ error: "User already has a cart" });
  } else {
    const newCart = await cartEntityService.createCart(userId, items);
    res.status(201).json(newCart);
  }
}

export async function updateCart(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const updatedCartData = req.body;

  const { error, value } = updateCartSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const updatedCart = await cartEntityService.updateCart(id, updatedCartData);
    if (!updatedCart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }
    res.json(updatedCart);
  }
}

export async function deleteCart(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  await cartEntityService.deleteCart(id);
  res.json({ message: "Cart deleted successfully" });
}
