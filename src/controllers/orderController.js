import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/Cart.js";
import successResponse from "../responseHandler/successResponse.js";

const getOrders = async (req, res, next) => {
    try {
        const user_id = req.user?._id;
        const userOrders = await Order.find({ user: user_id }).populate("products.product");
        if (userOrders.length === 0) throw new Error("Orders Not Found");
        successResponse(res, "Orders Fetched successfully", userOrders);
    } catch (error) {
        next(error);
    }
}
const getOrderbyId = async (req, res, next) => {
    try {
        const user_id = req.user?._id;
        const order_id = req.params.id;
        const order = await Order.findById(order_id);
        if (!order) throw new Error("Order Not Found");
        if (order.user.toString() !== user_id.toString()) throw new Error("Access Denied");
        successResponse(res, "Order Fetched successfully", order);
    } catch (error) {
        next(error);
    }
}
const createOrder = async (req, res, next) => {
    try {
        const {recieverName , phoneNumber , paymentMethod, shippingAddress } = req.body;
        if (!paymentMethod || !shippingAddress || !recieverName|| !phoneNumber) throw new Error("All fields Are required");
        const user_id = req.user?._id;
        const cart = await Cart.findOne({ user: user_id });
        if (!cart || cart.products.length === 0) throw new Error("Cart Is Empty");
        let totalAmount = 0;
        for (const item of cart.products) {
            const verifiedProduct = await Product.findById(item.product);
            // console.log(verifiedProduct);
            
            if (verifiedProduct) {
                if (verifiedProduct.stock >= item.quantity) {
                    totalAmount += verifiedProduct.price * item.quantity;
                    verifiedProduct.stock -= item.quantity
                    await verifiedProduct.save();
                } else {
                    throw new Error(`${verifiedProduct.title} stock not available`);
                }
            } else {
                throw new Error(`Product not Found`)
            }
        };
        const order = await Order.create({
            user: user_id,
            products: cart.products,
            totalPrice: totalAmount,
            recieverName,
            phoneNumber,
            shippingAddress,
            paymentMethod,
        })
        cart.products = []
        await cart.save();
        successResponse(res, "Order Created successfully", order);
    } catch (error) {
        next(error);
    }
}


const cancelOrder = async (req, res, next) => {
    try {
        const user_id = req.user?._id;
        const order_id = req.params.id;
        const order = await Order.findById(order_id);
        if (!order) throw new Error("Order Not Found");
        if (order.user.toString() !== user_id.toString()) throw new Error("it's Not Your Order");
        if (order.status !== "pending") throw new Error(`Order is ${order.status}`)
        for (const item of order.products) {
            const verifiedProduct = await Product.findById(item.product);
            if (verifiedProduct) {
                verifiedProduct.stock += item.quantity;
                await verifiedProduct.save();
            }
            if (!verifiedProduct) {
                throw new Error("Product Not Found");
            }
        };
        order.status = "cancelled";
        await order.save();
        successResponse(res, "Order Cancelled Successfully", order);
    } catch (error) {
        next(error);
    }
}

export { getOrders, getOrderbyId, createOrder, cancelOrder };