import React, { useState, useEffect } from "react";
import "../css/index.css";
import axios from "../axios";
import SideBar from "./sidebar";
import * as utils from "../helpers/utility";
import { Link } from "react-router-dom";

function ProductsList() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function fetchProducts() {
			const response = await axios.get("products");
			setProducts(response.data);
			return response;
		}
		fetchProducts();
	}, []);

	return (
		<div className="section">
			<div className="row">
				<div className="col-3">
					<SideBar />
				</div>
				<div className="col-9">
					<div className="row">
						{
							products.map((product, index) => (
								<div className="col-12" key={index}>
									<div className="card-holder">
										<div className="row bg-white">
											<div className="col-2">
												<div className="img-container">
													<img className="product-image" src={product.photo_name} alt={product.title} />
												</div>
											</div>
											<div className="col-10">
												<p className="product-title">{product.title}</p>
												<p className="product-description">{utils.shortenString(product.description, 300)}</p>
												<div className="cart-btns mt-3">
													<Link
														className="add-to-cart-btn"
														to={{
															pathname: "/order-product",
															state: { productId: product.id }
														}}
													>Buy Now
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductsList;