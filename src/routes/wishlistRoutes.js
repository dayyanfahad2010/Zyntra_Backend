import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
  getWishlist,
  addWishlist,
  removeWishlist,
} from "../controllers/wishlistController.js";

const wishlistRoutes = express.Router();

wishlistRoutes.get("/", authMiddleware, getWishlist);

wishlistRoutes.post("/", authMiddleware, addWishlist);

wishlistRoutes.delete("/:product_id", authMiddleware, removeWishlist);

export default wishlistRoutes;