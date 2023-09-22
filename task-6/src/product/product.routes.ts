import express from "express";
import * as productEntityController from "./product.controller";

const router = express.Router();

router.get("/", productEntityController.getAllProductEntities);
router.get("/:id", productEntityController.getProductEntityById);
router.post("/", productEntityController.createProductEntity);
router.put("/:id", productEntityController.updateProductEntity);
router.delete("/:id", productEntityController.deleteProductEntity);

export default router;
