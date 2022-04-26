module.exports = {
	up: async (queryInterface, dataTypes) => {
		await queryInterface.createTable("products", {
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
		await queryInterface.dropTable("products");
	}
};