import userProvider from "../providers/users.provider.js";
import createHttpError from "http-errors";
import { generateToken } from "../libs/jwt-helper.js";

const userController = {
	signIn(req, res, next) {
		const { email, password } = req.body;
		return userProvider.checkUser(email, password)
			.then(user => {
				if (user) {
					const token = generateToken({ user });
					const { id, email } = user;
					res.status(200).send({
						token,
						info: { id, email }
					});
				}
				else {
					throw createHttpError(403);
				}
			})
			.catch(next);
	},

	SignUp(req, res, next) {
		const { body: { email, password } } = req;

		return userProvider.findOneByEmail(email)
			.then(data => {
				if (data) {
					throw createHttpError(409);
				}
				else {
					const user = { email: email, password: password };
					return userProvider.createUser(user);
				}
			})
			.then(user => {
				const token = generateToken({ user });
				const { id, email } = user;
				res.status(200).send({
					token,
					info: { id, email }
				});
			})
			.then(data => {
				res.status(200).send(data);
			})
			.catch(next);
	},

	getUsers(req, res, next) {
		const { params: { id } } = req;

		return userProvider.findAll(id)
			.then(data => {
				if (data.length == 0 && id) {
					throw createHttpError(404);
				} else {
					res.status(200).send(data);
				}
			})
			.catch(next);
	}
};

export default userController;