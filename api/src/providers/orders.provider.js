class orderProvider {
	findAll = (id, userId) => {
		if (id && userId) {
			return this.findManyByAttr({ id: id, user_id: userId });
		} else if (userId) {
			return this.findManyByAttr({ user_id: userId });
		} else {
			return this.findManyByAttr();
		};
	}

	findManyByAttr = (attr) => {
		const order = db.orders;
		const include = [
			{ association: "productDetails", attributes: ["title", "description", "price", "photo_name"] },
			{ association: "userDetails", attributes: ["email"] }
		];

		return order.findAll({
			where: attr,
			include
		});
	}

	createOrder = (data) => {
		const order = db.orders;
		return order.create(data);
	}
}

export default new orderProvider();