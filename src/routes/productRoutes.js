import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);

export default productRoutes;
