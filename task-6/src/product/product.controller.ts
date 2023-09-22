import { Request, Response } from "express";
import * as productEntityService from "./product.service";

export async function getAllProductEntities(
  req: Request,
  res: Response
): Promise<void> {
  const productEntities = await productEntityService.getAllProductEntities();
  res.json(productEntities);
}

export async function getProductEntityById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const productEntity = await productEntityService.getProductEntityById(id);
  if (!productEntity) {
    res.status(404).json({ error: "ProductEntity not found" });
    return;
  }
  res.json(productEntity);
}

export async function createProductEntity(
  req: Request,
  res: Response
): Promise<void> {
  const productEntityData = req.body;
  const newProductEntity = await productEntityService.createProductEntity(
    productEntityData
  );
  res.status(201).json(newProductEntity);
}

export async function updateProductEntity(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const updatedProductEntityData = req.body;
  const updatedProductEntity = await productEntityService.updateProductEntity(
    id,
    updatedProductEntityData
  );
  if (!updatedProductEntity) {
    res.status(404).json({ error: "ProductEntity not found" });
    return;
  }
  res.json(updatedProductEntity);
}

export async function deleteProductEntity(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  await productEntityService.deleteProductEntity(id);
  res.json({ message: "ProductEntity deleted successfully" });
}
