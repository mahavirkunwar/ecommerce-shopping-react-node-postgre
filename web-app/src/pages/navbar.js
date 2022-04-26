import "../css/index.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const localUser = localStorage.getItem('userToken');
    const localEmail = localStorage.getItem('userEmail');
    const [user, setUser] = useState(localUser);
    const [userEmail, setUserEmail] = useState(localEmail);

    const logOut = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        setUser(null);
        setUserEmail(null);
    };
    return (
        <div className="section" id="navbar">
            <div className="row">
                <div className="col-6">
                    <div className="logo">
                        <Link to={"/"}>
                            <img
                                className="product-image"
                                src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
                                alt="logo"
                            />
                            <span className="website-name">Ecommerce Shopping</span>
                        </Link>
                    </div>
                </div>
                <div className="col-6">
                    <div className="navbar-actions">
                        <Link className="login-btn" to={"/"}>Home</Link>
                        {user
                            ?
                            <>
                                <Link className="login-btn" to={"/orders"}>Orders</Link>
                                <span className="user-email-span">
                                    {userEmail}
                                    (<button
                                        className="logout-btn"
                                        onClick={logOut}
                                    > logout
                                    </button>)
                                </span>
                            </>
                            :
                            <>
                                <Link className="login-btn" to={"/login"}>Login</Link>
                                <Link className="signup-btn" to={"/signup"}>Sign Up</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;