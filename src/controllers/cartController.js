import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import successResponse from "../responseHandler/successResponse.js";

const getCart = async (req, res, next) => {
    try {
        const user_id = req.user?._id;
        
        // console.log(cart);
        const cart = await Cart.findOne({ user: user_id }).populate("products.product");
        
        if (!cart || cart.products.length === 0) return successResponse(res, "Cart is Empty");
        successResponse(res, "Cart Fetched Successfully", cart);
    } catch (error) {
        next(error);
    }
}

const addToCart = async (req, res, next) => {
    try {
        const { product_id, quantity } = req.body;
        const user_id = req.user?._id;
        let quantityOfProduct = quantity || 1;
        if (!product_id) throw new Error("Product_id is Required");
        const isProductFound = await Product.findById(product_id);
        if (!isProductFound) throw new Error("Product Not Found");
        const cart = await Cart.findOne({ user: user_id });
        if (!cart || cart === null) {
            const createCart = await Cart.create({
                user: user_id,
                products: [
                    {
                        product: product_id,
                        quantity: quantityOfProduct
                    }
                ]
            })
            return successResponse(res, "Product added Successfully In cart", createCart);
        }
        const productAlreadyExists = cart.products.find((u) => u.product.toString() === product_id);
        if (!productAlreadyExists) {
            let product = {
                product: product_id,
                quantity: quantityOfProduct
            }
            cart.products.push(product);
            await cart.save();
            return successResponse(res, "Product added Successfully In cart", cart);
        }
        productAlreadyExists.quantity += quantityOfProduct;
        await cart.save();
        successResponse(res, "Product added Successfully In cart", cart);

    } catch (error) {
        next(error)
    }
}

const updateCartItem = async (req, res, next) => {
    try {
        const product_id = req.params.id;
        const { quantity } = req.body;
        const user_id = req.user?._id;
        const cart = await Cart.findOne({ user: user_id });
        if (!cart) throw new Error("Cart Is Empty");
        const productAlreadyExists = cart.products.find((u) => u.product.toString() === product_id.toString());
        if (!productAlreadyExists) throw new Error("product Not Found In Cart");
        if (!quantity || quantity < 1) {
            throw new Error("Quantity must be greater than 0");
        }
        productAlreadyExists.quantity = quantity;
        await cart.save();
        successResponse(res, "Product update Successfully In cart", cart);
    } catch (error) {
        next(error);
    }
}

const removeFromCart = async (req, res, next) => {
    try {
        const product_id = req.params.id;
        const user_id = req.user?._id;
        const cart = await Cart.findOne({ user: user_id });
        if (!cart) throw new Error("Cart Is Empty");
        const productExists = cart.products.find((u) => u.product.toString() === product_id);
        if (!productExists) throw new Error("product Not Found In Cart");
        cart.products = cart.products.filter((u) => u.product.toString() !== product_id);
        await cart.save();
        successResponse(res, "Product removed Successfully from cart", cart);
    } catch (error) {
        next(error)
    }
}

export { getCart, addToCart, updateCartItem, removeFromCart };

