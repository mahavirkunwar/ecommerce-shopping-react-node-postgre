import express from "express";
import expressUpload from "express-fileupload";
import dotEnv from "dotenv";
import nocache from "nocache";
import http from "http";
import path from "path";
import cors from "cors";
import db from "./src/models";
import routes from "./src/routes"

class app {
	constructor() {
		dotEnv.config();

		db.dbConnect()
			.then(postgre => {
				return this.configureApp(postgre);
			})
			.then(app => {
				return this.startServer(app);
			});
	}

	configureApp = (postgre) => {
		return new Promise((resolve, reject) => {
			const app = express();
			app.use(cors());
			app.use(nocache());
			app.use(expressUpload());
			app.use(express.json());
			app.use(express.urlencoded({ extended: true }));
			app.use(express.static(path.join(__dirname, "public")));
			app.use("/", routes);

			// 404
			app.use((req, res, next) => {
				return res.status(404).send({
					error: `Not found: ${req.url}`
				});
			});
			// 500
			app.use((err, req, res, next) => {
				const statusCode = err.status || 500;
				const { message, ...errors } = err;
				const error = Object.keys(errors).length ?
					Object.values(errors) :
					{ error: message };
				return res.status(statusCode).send(error);
			});

			global.db = postgre;
			global.rootDir = path.resolve(__dirname);
			resolve(app);
		});
	}

	startServer = (app) => {
		return new Promise((resolve, reject) => {
			const port = process.env.PORT;
			app.set("port", port);
			const server = http.createServer(app);
			server.on("listening", () => {
				const bind = server.address().port;
				console.log("Ecommerce API listening on " + `http://localhost:${bind}`);
			});
			server.listen(port);

			resolve(server);
		});
	}
}

export default new app();