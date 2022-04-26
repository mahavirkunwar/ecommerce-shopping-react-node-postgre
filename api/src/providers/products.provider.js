class productProvider {
	findAll = (id) => {
		if (id) {
			return this.findManyByAttr({ id: id });
		} else {
			return this.findManyByAttr();
		};
	}

	findManyByAttr = (attr) => {
		const product = db.products;
		const order = ["product_name"]["DESC"];

		return product.findAll({
			where: attr,
			order
		});
	}

	createProduct = (data) => {
		const product = db.products;
		return product.create(data);
	}
}

export default new productProvider();