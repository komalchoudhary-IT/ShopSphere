import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const getCart = async () => {
        try {
            const res = await api.get("cart/");
            setCartItems(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCart();
    }, []);
    useEffect(() => {
    console.log("CART DATA:", cartItems);
}, [cartItems]);

    const updateQty = async (id, qty) => {
        await api.put(`cart/update/${id}/`, { quantity: qty });
        getCart();
    };

    const removeItem = async (id) => {
        await api.delete(`cart/remove/${id}/`);
        getCart();
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.product_price * item.quantity,
        0
    );

    const placeOrder = async () => {
        try {
            await api.post("orders/place/");
            alert("Order Placed Successfully");
            setCartItems([]);
        } catch (err) {
            alert("Order Failed");
        }
    };

    return (
        <div className="cart-container" id="cart-page">
            <h2>Your Cart</h2>

            {cartItems.map((item) => (
                <div key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
                
                   <img src={item.product_image} className="product-image" />
                        

                    <h3>{item.product_name}</h3>
                    <p>₹ {item.product_price}</p>

                    <div>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="qty-btn increase-btn">+</button>
                        <button className="qty-btn decrease-btn" onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                        <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>

                </div>
            ))}

            <h2>Total: ₹ {total}</h2>

            <button onClick={placeOrder}>Place Order</button>

            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                Go to Checkout
            </button>
        </div>
    );
}