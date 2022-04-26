class userProvider {
	findAll = (id) => {
		if (id) {
			return this.findManyByAttr({ id: id });
		} else {
			return this.findManyByAttr();
		};
	}

	findManyByAttr = (attr) => {
		const user = db.users;
		const order = ["id"];
		return user.findAll({
			where: attr,
			order
		});
	}

	findOneByAttr = (attr) => {
		const user = db.users;
		return user.findOne({
			where: attr
		});
	}

	checkUser = (email, password) => {
		return this.findOneByAttr({ email: email, password: password });
	}

	findOneByEmail = (email) => {
		return this.findOneByAttr({ email: email });
	}

	createUser = (data) => {
		const user = db.users;
		return user.create(data);
	}
}

export default new userProvider();