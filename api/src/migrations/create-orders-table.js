module.exports = {
	up: async (queryInterface, dataTypes) => {
		await queryInterface.createTable("orders", {
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
			created_at: {
				allowNull: false,
				type: dataTypes.DATE
			},
			updated_at: {
				allowNull: false,
				type: dataTypes.DATE
			}
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable("orders");
	}
};