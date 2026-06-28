import express from "express";
import {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.put("/logout", logout);
authRoutes.post("/signup", signUp);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
