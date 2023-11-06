import { ProductEntity } from "./product.model";
import * as productEntityRepository from "./product.repository";

export async function getAllProductEntities(): Promise<ProductEntity[]> {
  return productEntityRepository.getAllProductEntities();
}

export async function getProductEntityById(
  id: string
): Promise<ProductEntity | null> {
  return productEntityRepository.getProductEntityById(id);
}

export async function createProductEntity(
  productEntityData: ProductEntity
): Promise<ProductEntity> {
  return productEntityRepository.createProductEntity(productEntityData);
}

export async function updateProductEntity(
  id: string,
  updatedProductEntityData: Partial<ProductEntity>
): Promise<ProductEntity | null> {
  return productEntityRepository.updateProductEntity(
    id,
    updatedProductEntityData
  );
}

export async function deleteProductEntity(id: string): Promise<void> {
  return productEntityRepository.deleteProductEntity(id);
}
