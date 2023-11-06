import express from "express";
import * as orderEntityController from "./order.controller";

const router = express.Router();

router.get("/", orderEntityController.getAllOrders);
router.get("/:id", orderEntityController.getOrderById);
router.post("/", orderEntityController.createOrder);
router.put("/:id", orderEntityController.updateOrder);
router.delete("/:id", orderEntityController.deleteOrder);

export default router;
