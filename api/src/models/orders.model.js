const ordersModel = (sequelize, dataTypes) => {
	const order = sequelize.define("orders", {
		id: {
			primaryKey: true,
			allowNull: false,
			type: dataTypes.UUID,
			defaultValue: dataTypes.UUIDV4
		},
		user_id: {
			allowNull: false,
			type: dataTypes.UUID
		},
		product_id: {
			allowNull: false,
			type: dataTypes.UUID
		},
		address: {
			allowNull: false,
			type: dataTypes.STRING
		},
	},
	{
		underscored: true,
		tableName: "orders",
		timestamps: true,
	});

	order.associate = (models) => {
		order.belongsTo(models.products, {
			foreignKey: "product_id",
			as: "productDetails",
		});

		order.belongsTo(models.users, {
			foreignKey: "user_id",
			as: "userDetails",
		});
	};

	return order;
};
export default ordersModel;