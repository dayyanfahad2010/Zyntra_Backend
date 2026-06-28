import { Product } from "../models/Product.js";
import successResponse from "../responseHandler/successResponse.js";

const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
    } = req.query;
    let query = {};
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      let price = {};
      if (minPrice) {
        price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        price.$lte = Number(maxPrice);
      }
      query.price = price;
    }
    let sortOptions = {};
    if (sort === "price") {
      sortOptions.price = 1;
    }
    if (sort === "-price") {
      sortOptions.price = -1;
    }
    const pageInNum = Number(page);
    const limitInNum = Number(limit);

    const products = await Product.find(query)
      .populate("category")
      .sort(sortOptions)
      .skip((pageInNum - 1) * limitInNum)
      .limit(limitInNum);
      
    const totalProducts = await Product.countDocuments(query);
    if(products.length===0){
      const error = new Error("Product not Found");
      error.statusCode = 404;
      throw error;}
    successResponse(res, "Products Fetch Successfully", products, {
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitInNum),
      currentPage: pageInNum,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("Product not Found");
      error.statusCode = 404;
      throw error;
    }
    successResponse(res, "Product fetched Succcessfully", product);
  } catch (error) {
    next(error);
  }
};

export { getProducts, getProductById };
