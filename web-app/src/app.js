import React, { Component } from 'react';
import Home from "./pages/home";
import Navbar from "./pages/navbar";
import "./css/index.css";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Orders from "./pages/orders";
import OrderProduct from "./pages/orderProduct";

class App extends Component {
	render() {
		return (
			<Router>
				<Navbar />
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/login" component={Login} exact />
					<Route path="/signup" component={Signup} exact />
					<Route path="/orders" component={Orders} exact />
					<Route path="/order-product" component={OrderProduct} exact />
				</Switch>
			</Router>
		);
	}
}

export default App;