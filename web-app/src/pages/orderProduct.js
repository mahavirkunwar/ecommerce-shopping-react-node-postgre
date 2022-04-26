import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/index.css";
import Const from "../config/const.js";
import { useLocation } from "react-router"
const orderURL = `${Const.baseURL}/orders/create`

function orderProduct() {
	const [address, setAddress] = useState("");
	const [message, setMessage] = useState("");
	const localUser = localStorage.getItem('userToken');
	const [user] = useState(localUser);
	const [product, setProduct] = useState({});

	const location = useLocation();
	const productId = location.state.productId;
	const userId = localStorage.getItem('userId');

	useEffect(() => {
		async function fetchProduct() {
			const response = await axios.get(`products/${productId}`);
			setProduct(response.data);
			return response;
		}
		fetchProduct();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!user && !userId) {
			setMessage("Login Required");
		}
		else if (address == "") {
			setMessage("(*) Marked fields are required");
		}
		else {
			const order = {
				product_id: productId,
				user_id: userId,
				address: address
			};
			axios
				.post(orderURL, order)
				.then(async response => {
					console.log("response", response);
					if (response.status === 200) {
						setAddress("");
						const orderId = response.data.id;
						setMessage(`Order placed with orderId "${orderId}"`);
					} else {
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
						{!user
							?
							<div className="row">
								<div>Login Required</div>
							</div>
							:
							<div className="row">
								<div className="col-12">
									<h2 className="mb-5">Create a Order</h2>
								</div>
								<div className="col-12">
									<div className="card-holder-2">
										<div className="col-12">
											<div className="img-container-2">
												<img className="product-image" src={product.photo_name} alt={product.title} />
											</div>
										</div>
										<div className="col-12">
											<p className="product-title-2">{product.title}</p>
										</div>
									</div>
								</div>
								<div className="col-12">
									<span className="">Address *</span>
									<input
										className="input-field"
										name="address"
										type="address"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</div>
								<div className="col-12">
									<input className="submit-btn" type="submit" name="Order" value="Order" />
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

export default orderProduct;