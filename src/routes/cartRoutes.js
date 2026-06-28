import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../controllers/cartController.js";

const cartRoutes = express.Router();

cartRoutes.get("/", authMiddleware, getCart);
cartRoutes.post("/", authMiddleware, addToCart);
cartRoutes.put("/:id", authMiddleware, updateCartItem);
cartRoutes.delete("/:id", authMiddleware, removeFromCart);

export default cartRoutes;
