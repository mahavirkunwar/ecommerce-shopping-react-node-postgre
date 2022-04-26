import express from "express";
import productController from "../controllers/products.controller.js";

const productsRouter = express.Router();

productsRouter.post("/create", productController.create);
productsRouter.get("/:id?", productController.getProducts);

export default productsRouter;