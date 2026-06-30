import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import VendorOrders from "./pages/VendorOrders";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import ProductList from "./pages/ProductList";
import Footer from "./Components/Footer";
import ProductDetails from "./pages/ProductDetails";
import VendorDashboard from "./pages/VendorDashboard";
import Profile from "./pages/Profile";
function App() {
    return (
        <BrowserRouter>
        <Navbar /> 
        
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/vendor/orders" element={<VendorOrders />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/my-products" element={<MyProducts />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;