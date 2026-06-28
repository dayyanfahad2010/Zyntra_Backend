import express from "express"
import {getCategories,getCategoryById} from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/",getCategories);
categoryRoutes.get("/:id",getCategoryById);

export default categoryRoutes;