const usersModel = (sequelize, dataTypes) => {
	const user = sequelize.define("users", {
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
		}
	},
	{
		underscored: true,
		tableName: "users",
		timestamps: true
	});

	return user;
};
export default usersModel;