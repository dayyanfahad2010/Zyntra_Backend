import { Category } from "../models/Category.js";
import successResponse from "../responseHandler/successResponse.js";

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      const error = new Error("Category not Found");
      error.statusCode = 404;
      throw error;
    }
    successResponse(res, "Category fetched Succcessfully", category);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    successResponse(res, "Categories fetched Successfully", categories);
  } catch (error) {
    next(error);
  }
};

export { getCategories, getCategoryById };
