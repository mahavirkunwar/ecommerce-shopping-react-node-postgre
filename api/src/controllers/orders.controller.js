import orderProvider from "../providers/orders.provider.js";
import createHttpError from "http-errors";

const orderController = {
	create(req, res, next) {
		const { body: order } = req;
		const { address, user_id, product_id } = order;
		if (!address || address == "" || !product_id || !user_id) {
			throw createHttpError(400);
		}
		return orderProvider.createOrder(order)
			.then(data => {
				res.status(200).send(data);
			})
			.catch(next);
	},

	getOrders(req, res, next) {
		const { params: { id }, query: { userId } } = req;
		return orderProvider.findAll(id, userId)
			.then(data => {
				if (data.length == 0 && id) {
					res.status(404).send();
				} else if (id) {
					res.status(200).send(data[0]);
				} else {
					res.status(200).send(data);
				}
			})
			.catch(next);
	}
};

export default orderController;