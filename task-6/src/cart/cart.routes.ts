import express from "express";
import * as cartEntityController from "./cart.controller";

const router = express.Router();

router.get("/", cartEntityController.getAllCarts);
router.get("/:id", cartEntityController.getCartById);
router.post("/", cartEntityController.createCart);
router.put("/:id", cartEntityController.updateCart);
router.delete("/:id", cartEntityController.deleteCart);

export default router;
