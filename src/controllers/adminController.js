import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";
import { Category } from "../models/Category.js";
import { Cart } from "../models/Cart.js";
import successResponse from "../responseHandler/successResponse.js";
import uploadImages from "../utils/uploadImages.js";
import cloudinary from "../config/cloudinary.js";
import { Notification } from "../models/Notification.js";
import { getIO } from "../socket/socket.js";

const getDashboardStates = async (req, res, next) => {
    try {
        const usersArray = await User.find();
        const productsArray = await Product.find();
        const ordersArray = await Order.find();
        const pendingOrders = await Order.find({ status: "Pending" });
        let totalRevenue = 0;
        for (let item in ordersArray) {
            totalRevenue += item.totalPrice;
        }
        successResponse(res, "Dashboard fetched Successfully", { totalUsers: usersArray.length, totalProducts: productsArray.length, totalOrders: ordersArray.length, Pending_Orders: pendingOrders.length, totalRevenue });
    } catch (error) {
        next(error);
    }
}
const createCategory = async (req, res, next) => {
    try {
        const { name,icon } = req.body;
        const alreadyExists = await Category.findOne({ name });
        if (alreadyExists) throw new Error("Category Already Exists");
        const category = await Category.create({
            name,icon
        });
        successResponse(res, "Category Created Successfully", category);
    } catch (error) {
        next(error);
    }
}
const editCategory = async (req, res, next) => {
    try {
        const { name ,icon} = req.body;
        const category_id = req.params.id;
        const category = await Category.findById(category_id);
        if (!category) throw new Error("Category not Found");
        category.name = name;
        if(icon) category.icon =icon
        await category.save();
        successResponse(res, "Category Updated Successfully", category);
    } catch (error) {
        next(error);
    }
}
const deleteCategory = async (req, res, next) => {
    try {
        const category_id = req.params.id;
        const category = await Category.findById(category_id);
        if (!category) throw new Error("Category not Found");
        const products = await Product.find({
            category: category_id
        });

        if (products.length > 0) {
            throw new Error(
                "Category contains products"
            );
        }
        await Category.findByIdAndDelete(category_id);
        successResponse(res, "Category Deleted Successfully");
    } catch (error) {
        next(error);
    }
}
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        successResponse(res, "Users fetched Successfully", users);
    } catch (error) {
        next(error);
    }
}
const getUserById = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const user = await User.findById(user_id);
        if (!user) throw new Error("User not Found");
        successResponse(res, "User fetched Successfully", user);
    } catch (error) {
        next(error);
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const user = await User.findById(user_id);
        if (!user) throw new Error("User not Found");
        await User.findByIdAndDelete(user_id);
        successResponse(res, "User deleted Successfully");
    } catch (error) {
        next(error);
    }
}

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("products.product");
        successResponse(res, "Orders fetched Successfully", orders);
    } catch (error) {
        next(error);
    }
}
const getOrderById = async (req, res, next) => {
    try {
        const order_id = req.params.id;
        const order = await Order.findById(order_id)
            .populate("user")
            .populate("products.product");
        successResponse(res, "Order fetched Successfully", order);
    } catch (error) {
        next(error);
    }
}
const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const order_id = req.params.id;
        const order = await Order.findById(order_id);
        if (!order) throw new Error("Order not Found");
        const user_id = order.user;
        if (order.status === "delivered") {
            throw new Error("Delivered orders cannot be updated");
        }
        if (order.status === status) {
            throw new Error("Order already has this status");
        }
        order.status = status;
        await order.save();
        const notification = await Notification.create({
            title: "Order Update",
            message: `Order #${order._id} is now ${status}`,
            user: user_id
        });
        const io = getIO();

        io.to(user_id.toString()).emit(
            "new_notification",
            notification
        );
        successResponse(res, "Order Updated Successfully", order);
    } catch (error) {
        next(error);
    }
};
const createProduct = async (req, res, next) => {
    try {
        const { title, description, stock, price, category_id } = req.body;
        if (!category_id) {
  throw new Error("Category is required");
}
        const files = req.files;
        console.log(req.headers["content-type"]);
console.log(req.body);
console.log(req.files);
        // console.log();

        if (!title || !description || !stock || !price || files.length === 0) throw new Error("All fieds are required");
        if (stock < 0) throw new Error("Invalid Stock");
        if (price < 0) throw new Error("Invalid price");
        const category = await Category.findById(category_id);
        if (!category) throw new Error("Category Not Found");
        const urls = await uploadImages(files);
        console.log(urls);

        const product = await Product.create({
            title,
            description,
            stock,
            price,
            images: urls,
            category: category_id
        });
        successResponse(res, "Product Created Successfully", product);
    } catch (error) {
        next(error);
    }
}
const editProduct = async (req, res, next) => {
    try {
        const { title, description, stock, price, category_id } = req.body;
        const product_id = req.params.id;
        const files = req.files;
        const product = await Product.findById(product_id);
        if (!product) throw new Error("Product Not Found");
        if (files && files.length > 0) {
            for (const image of product.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
            const urls = await uploadImages(files);
            product.images = urls;
        }
        if (stock && stock < 0) throw new Error("Invalid stock");
        if (price && price < 0) throw new Error("Invalid price");
        if (category_id) {
            const category = await Category.findById(category_id);
            if (!category) throw new Error("Category Not Found");
        }
        if (title) product.title = title
        if (description) product.description = description
        if (stock !== undefined) product.stock = stock;
        if (price !== undefined) product.price = price;
        if (category_id) product.category = category_id
        await product.save();
        successResponse(res, "Product Edited Successfully", product);
    } catch (error) {
        next(error);
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const product_id = req.params.id;
        const productFound = await Product.findById(product_id);
        if (!productFound) throw new Error("Product Not Found");
        for (const image of productFound.images) {
            await cloudinary.uploader.destroy(
                image.public_id
            );
        };
        await Cart.updateMany(
            {},
            {
                $pull: {
                    products: {
                        product: product_id
                    }
                }
            }
        );
        await Product.findByIdAndDelete(product_id);
        successResponse(res, "Product Deleted Successfully");
    } catch (error) {
        next(error);
    }
};

const createNotification = async (req, res, next) => {
    try {
        const io = getIO()
        const { title, message } = req.body;
        if (!title || !message) throw new Error("All fields are required");
        const notification = await Notification.create({
            title,
            message
        });
        io.emit("notification", notification);
        successResponse(res, "Notification Created successfully", notification);
    } catch (error) {
        next(error);
    }
};

const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find()
            .sort({ createdAt: -1 });
        successResponse(res, "Notifications Fetched successfully", notifications);
    } catch (error) {
        next(error);
    }
};

const deleteNotification = async (req, res, next) => {
    try {
        const notification_id = req.params.id;
        const notification = await Notification.findByIdAndDelete(notification_id);
        if (!notification) throw new Error("Notification not found");
        successResponse(res, "Notification Deleted successfully");
    } catch (error) {
        next(error);
    }
};


export { getDashboardStates, createCategory, editCategory, deleteCategory, getOrders, getOrderById, updateOrderStatus, getUsers, getUserById, deleteUser, createProduct, editProduct, deleteProduct, getNotifications, createNotification, deleteNotification };