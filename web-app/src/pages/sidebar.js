import React, { useState, useEffect } from "react";
import "../css/index.css";
import axios from "../axios";

function SideBar() {
    const [sideProducts, setProducts] = useState([]);

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
            <div className="row sidebar-container">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="mb-3 weight-900">PRODUCTS LIST</h2>
                        </div>
                        {
                            sideProducts.map((product, index) => (
                                <div className="col-12" key={index}>
                                    <div className="card-holder-side">
                                        <div className="row bg-white">
                                            <div className="col-12">
                                                <p className="product-title-sm">{product.title}</p>
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

export default SideBar;