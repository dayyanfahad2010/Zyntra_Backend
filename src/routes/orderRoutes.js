import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getOrders, getOrderbyId, createOrder, cancelOrder } from "../controllers/orderController.js";

const orderRoutes = express.Router();

orderRoutes.get("/", authMiddleware, getOrders);
orderRoutes.get("/:id", authMiddleware, getOrderbyId);
orderRoutes.post("/", authMiddleware, createOrder);
orderRoutes.put("/:id/cancel", authMiddleware, cancelOrder);

export default orderRoutes;
