import productProvider from "../providers/products.provider.js";

const productController = {
	create(req, res, next) {
		const { body: product } = req;
		return productProvider.createProduct(product)
			.then(data => {
				res.status(200).send(data);
			})
			.catch(next);
	},

	getProducts(req, res, next) {
		const { params: { id } } = req;

		return productProvider.findAll(id)
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
	},
};

export default productController;