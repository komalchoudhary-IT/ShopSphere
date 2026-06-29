import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Checkout() {

    const [cartItems, setCartItems] = useState([]);

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

    const total = cartItems.reduce(
        (acc, item) => acc + item.product_price * item.quantity,
        0
    );

    const placeOrder = async () => {
        try {
            await api.post("orders/place/");
            alert("Order Placed Successfully!");
            setCartItems([]);
        } catch (err) {
            alert("Order Failed");
        }
    };

    return (
        <div className="checkout-container">

            <h2>Checkout</h2>

            <div className="checkout-box">

                {cartItems.map((item) => (
                    <div className="checkout-item" key={item.id}>
                        <h3>{item.product_name}</h3>
                        <p>Price: ₹{item.product_price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Subtotal: ₹{item.product_price * item.quantity}</p>
                    </div>
                ))}

                <hr />

                <h3>Total: ₹{total}</h3>

                <button className="place-order-btn" onClick={placeOrder}>
                    Place Order
                </button>

            </div>

        </div>
    );
}