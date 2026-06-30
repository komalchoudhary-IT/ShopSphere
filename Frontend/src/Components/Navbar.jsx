import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {

    const role = localStorage.getItem("role");
    const navigate = useNavigate();
 
    const logout = () => {
    localStorage.clear();
    navigate("/login");
};
    return (

        <nav className="navbar" id="main-navbar">

            <h2 className="navbar-logo">ShopSphere</h2>

            <div className="navbar-links">

                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/products">Products</Link>  

                {!role && (
                    <>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                    </>
                )}

                {role === "customer" && (
                    <>
                        <Link className="nav-link" to="/cart">Cart</Link>
                        <Link className="nav-link" to="/orders">My Orders</Link>
                    </>
                )}

                {role === "vendor" && (
                    <>
                        <Link className="nav-link" to="/add-product">Add Product</Link>
                        <Link className="nav-link" to="/my-products">My Products</Link>
                        <Link className="nav-link" to="/vendor/orders">Vendor Orders</Link>
                    </>
                )}
                {/* {role && (
                        <button onClick={logout}>Logout</button>
                )} */}
                <button className="logout-btn" onClick={logout}>LOGOUT</button>
            </div>

        </nav>

    );
}

