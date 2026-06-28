import { Wishlist } from "../models/WishList.js";
import successResponse from "../responseHandler/successResponse.js";

export const getWishlist = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    const wishlist = await Wishlist.findOne({
      user: user_id,
    }).populate("products.product");

    if (!wishlist) {
      return successResponse(res, "Wishlist Empty", []);
    }

    successResponse(res, "Wishlist Fetched", wishlist.products);
  } catch (err) {
    next(err);
  }
};

export const addWishlist = async (req, res, next) => {
  try {
    const user_id = req.user?._id;
    const { product } = req.body;

    let wishlist = await Wishlist.findOne({
      user: user_id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: user_id,
        products: [],
      });
    }

    const alreadyExists = wishlist.products.find(
      (p) => p.product.toString() === product
    );

    if (alreadyExists)
      throw new Error("Product already in wishlist");

    wishlist.products.push({
      product,
    });

    await wishlist.save();

    successResponse(res, "Added To Wishlist", wishlist);
  } catch (err) {
    next(err);
  }
};

export const removeWishlist = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { product_id } = req.params;

    const wishlist = await Wishlist.findOne({
      user: user_id,
    });

    if (!wishlist)
      throw new Error("Wishlist not found");

    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== product_id
    );

    await wishlist.save();

    successResponse(res, "Removed From Wishlist");
  } catch (err) {
    next(err);
  }
};