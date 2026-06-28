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

app.use(express.json());
app.use(cors({
    origin: "https://zyntra-frontend-zeta.vercel.app/",
    credentials: true,
  }));
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