import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/multer.js";
import { getDashboardStates, createCategory, editCategory, deleteCategory, getOrders, getOrderById, updateOrderStatus, getUsers, getUserById, deleteUser, createProduct, editProduct, deleteProduct, getNotifications, createNotification, deleteNotification } from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStates);

adminRoutes.post("/products", authMiddleware, adminMiddleware, upload.array("images", 5), createProduct);
adminRoutes.put("/products/:id", authMiddleware, adminMiddleware, upload.array("images", 5), editProduct);
adminRoutes.delete("/products/:id", authMiddleware, adminMiddleware, deleteProduct);

adminRoutes.post("/categories", authMiddleware, adminMiddleware, createCategory);
adminRoutes.put("/categories/:id", authMiddleware, adminMiddleware, editCategory);
adminRoutes.delete("/categories/:id", authMiddleware, adminMiddleware, deleteCategory);

adminRoutes.get("/orders", authMiddleware, adminMiddleware, getOrders);
adminRoutes.get("/orders/:id", authMiddleware, adminMiddleware, getOrderById);
adminRoutes.put("/orders/:id", authMiddleware, adminMiddleware, updateOrderStatus);

adminRoutes.get("/users", authMiddleware, adminMiddleware, getUsers);
adminRoutes.get("/users/:id", authMiddleware, adminMiddleware, getUserById);
adminRoutes.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

adminRoutes.get("/notifications", authMiddleware, adminMiddleware, getNotifications);
adminRoutes.post("/notifications", authMiddleware, adminMiddleware, createNotification);
adminRoutes.delete("/notifications/:id", authMiddleware, adminMiddleware, deleteNotification);

export default adminRoutes;