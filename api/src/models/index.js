import dotEnv from "dotenv";
import Sequelize from "sequelize";
import usersModel from "./users.model.js";
import ordersModel from "./orders.model.js";
import productsModel from "./products.model.js";

class dbContext {
	constructor() {
		dotEnv.config();
	}

	dbConnect = () => {
		return new Promise((resolve) => {
			const connection = new Sequelize(
				process.env.DB_DATABASE,
				process.env.DB_USERNAME,
				process.env.DB_PASSWORD,
				{
					host: process.env.DB_HOST,
					dialect: process.env.DB_DIALECT,
					operatorsAliases: 0,
					pool: {
						max: 5,
						min: 0,
						acquire: 30000,
						idle: 10000
					}
				}
			);

			const db = {
				users: usersModel(connection, Sequelize),
				orders: ordersModel(connection, Sequelize),
				products: productsModel(connection, Sequelize)
			};

			Object.keys(db).forEach(modelName => {
				if (db[modelName].associate) {
					db[modelName].associate(db);
				}
			});

			db.Sequelize = Sequelize;
			db.connection = connection;

			resolve(db);
		});
	}
}

export default new dbContext();