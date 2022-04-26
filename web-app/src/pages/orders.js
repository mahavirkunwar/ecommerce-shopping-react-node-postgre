import "../css/index.css";
import axios from "../axios";
import React, { useState, useEffect } from "react";
import * as utils from "../helpers/utility";

function Orders() {
	const [orders, setOrders] = useState([]);
	const userId = localStorage.getItem('userId');
	useEffect(() => {
		async function fetchOrders() {
			const response = await axios.get(`orders/?userId=${userId}`);
			console.log("response.data", response.data);
			setOrders(response.data);
			return response;
		}
		fetchOrders();
	}, []);

	return (
		<div className="section">
			<div className="row">
				{
					orders.length > 0
					?
					orders.map((order, index) => (
						<div className="col-12 justify-center" key={index}>
							<div className="row order-container">
								<div className="col-2">
									<div className="img-container-3">
										<img className="product-image" src={order.productDetails.photo_name} alt={order.productDetails.title} />
									</div>
								</div>
								<div className="col-10 order-details-container">
									<p className="product-title mb-1">{order.productDetails.title}</p>
									<p className="product-description mb-1"><strong>Order ID: </strong> {order.id}</p>
									<p className="product-description mb-1"><strong>Purchased by: </strong>{order.userDetails.email}</p>
									<p className="product-description mb-1"><strong>Address: </strong> {order.address}</p>
									<p className="product-description mb-1">{utils.shortenString(order.productDetails.description, 300)}</p>
								</div>
							</div>
						</div>
					))
					: 
					<div className="col-12 justify-center">
							<div className="row">
								<h3 className="text-center">No orders</h3>
							</div>
						</div>
				}
			</div>
		</div>
	);
}

export default Orders;