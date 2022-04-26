import express from "express";
import orderController from "../controllers/orders.controller.js";

const ordersRouter = express.Router();

ordersRouter.post("/create", orderController.create);
ordersRouter.get("/:id?", orderController.getOrders);

export default ordersRouter;