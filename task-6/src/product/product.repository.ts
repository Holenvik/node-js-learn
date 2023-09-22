import { customAlphabet } from "nanoid";
import { ProductEntity } from "./product.model";

const alphabet = "0123456789";
const nanoid = customAlphabet(alphabet, 10);

const productEntities: ProductEntity[] = [
  {
    title: "title",
    description: "string",
    price: 250,
    id: "1",
  },
];

export async function getAllProductEntities(): Promise<ProductEntity[]> {
  return productEntities;
}

export async function getProductEntityById(
  id: string
): Promise<ProductEntity | null> {
  console.log(typeof id);
  return (
    productEntities.find((productEntity) => productEntity.id === id) || null
  );
}

export async function createProductEntity(
  productEntityData: ProductEntity
): Promise<ProductEntity> {
  const newProductEntity: ProductEntity = {
    ...productEntityData,
    price: Number(productEntityData.price),
    id: nanoid(),
  };
  productEntities.push(newProductEntity);
  return newProductEntity;
}

export async function updateProductEntity(
  id: string,
  updatedProductEntityData: Partial<ProductEntity>
): Promise<ProductEntity | null> {
  const productEntityIndex = productEntities.findIndex(
    (productEntity) => productEntity.id === id
  );
  if (productEntityIndex === -1) {
    return null;
  }
  productEntities[productEntityIndex] = {
    ...productEntities[productEntityIndex],
    ...updatedProductEntityData,
  };
  return productEntities[productEntityIndex];
}

export async function deleteProductEntity(id: string): Promise<void> {
  const productEntityIndex = productEntities.findIndex(
    (productEntity) => productEntity.id === id
  );
  if (productEntityIndex !== -1) {
    productEntities.splice(productEntityIndex, 1);
  }
}
