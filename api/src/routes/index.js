import express from "express";
import ordersRouter from "./orders.route.js";
import productsRouter from "./products.route.js";
import usersRouter from "./users.route.js";

const router = express.Router();

router.get("/", (req, res) => {
	return res.send("This is base {/index} API. Use the respective routes to begin.");
});
router.use("/orders", ordersRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

export default router;