module.exports = {
	up: async (queryInterface, dataTypes) => {
		await queryInterface.createTable("users", {
			id: {
				primaryKey: true,
				allowNull: false,
				type: dataTypes.UUID,
				defaultValue: dataTypes.UUIDV4
			},
			email: {
				allowNull: false,
				type: dataTypes.STRING(100),
				validate: {
					isEmail: true,
				}
			},
			password: {
				allowNull: false,
				type: dataTypes.STRING(255)
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
		await queryInterface.dropTable("users");
	}
};