import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://zyntra-frontend-zeta.vercel.app",
    "https://zyntra-frontend-zeta.netlify.app"
  ], // exact frontend URL
  credentials: true, // agar cookies/auth use ho rahi hai
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.options("*", cors(corsOptions)); 
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/",authRoutes);
app.use("/api/products/",productRoutes);
app.use("/api/categories/",categoryRoutes);
app.use("/api/notifications/",notificationRoutes);
app.use("/api/cart/",cartRoutes);
app.use("/api/wishlist/",wishlistRoutes);
app.use("/api/order/",orderRoutes);
app.use("/api/admin/",adminRoutes);
app.use(errorMiddleware);

export default app;