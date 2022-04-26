import React, { useState } from "react";
import axios from "../axios";
import "../css/index.css";
import Const from "../config/const.js";

const signUpURL = `${Const.baseURL}/users/signup`

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const localUser = localStorage.getItem('userToken');
	const localEmail = localStorage.getItem('userEmail');
	const [user] = useState(localUser);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email == "" || password == "") {
			setMessage("(*) Marked fields are required");
		}
		else {
			const user = {
				email: email,
				password: password
			};
			axios
				.post(signUpURL, user)
				.then(response => {
					if (response.status === 200) {
						setEmail("");
						setPassword("");
						setMessage("Signup Successful");
						const { id, email: localEmail } = response.data.info;
						localStorage.setItem('userToken', response.data.token);
						localStorage.setItem('userEmail', localEmail);
						localStorage.setItem('userId', id);
					}
					else {
						setMessage("Some error occured");
					}
				})
				.catch(() => {
					setMessage("Some error occured");
				});
		}
	};

	return (
		<div className="section">
			<div className="row">
				<div className="col-12">
					<form className="login-form" onSubmit={handleSubmit}>
						{user
							?
							<div className="row">
								<div>{localEmail} is loggged in</div>
							</div>
							:
							<div className="row">
								<div className="col-12">
									<h2 className="mb-5">New User SignUp</h2>
								</div>
								<div className="col-12">
									<span className="">Email *</span>
									<input
										className="input-field"
										name="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="col-12">
									<span className="">Password *</span>
									<input className="input-field"
										name="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className="col-12">
									<input className="submit-btn" type="submit" name="Signup" value="Signup" />
								</div>
								<div className="col-12">{message ? <p className="message">{message}</p> : null}</div>
							</div>
						}

					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUp;