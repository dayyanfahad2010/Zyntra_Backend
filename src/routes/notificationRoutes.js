import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getNotifications, readAllNotifications, readNotification } from "../controllers/notificationController.js";

const notificationRoutes = express.Router();

notificationRoutes.get("/", authMiddleware, getNotifications);
notificationRoutes.put("/:id/read", authMiddleware, readNotification);
notificationRoutes.put("/read-all", authMiddleware, readAllNotifications);

export default notificationRoutes;
