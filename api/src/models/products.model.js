const productsModel = (sequelize, dataTypes) => {
	const product = sequelize.define("products", {
		id: {
			primaryKey: true,
			allowNull: false,
			type: dataTypes.UUID,
			defaultValue: dataTypes.UUIDV4
		},
		title: {
			allowNull: false,
			type: dataTypes.STRING(255)
		},
		photo_name: {
			allowNull: true,
			type: dataTypes.STRING(255)
		},
		description: {
			allowNull: true,
			type: dataTypes.STRING(1000)
		}
	},
	{
		underscored: true,
		tableName: "products",
		timestamps: true
	});

	return product;
};
export default productsModel;