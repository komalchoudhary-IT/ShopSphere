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

    const updateQty = async (id, qty) => {
        await api.put(`cart/update/${id}/`, {
            quantity: qty
        });

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
        const res = await api.post("orders/place/");
        alert("Order Placed Successfully");
        setCartItems([]);
    } catch (err) {
        alert("Order Failed");
    }
};

    return (
        <div >
            <h2 >Your Cart</h2>

            {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 mb-3 rounded shadow">
                    <h3>{item.product_name}</h3>
                    <p>Price: ₹{item.product_price}</p>

                    <p>Quantity: {item.quantity}</p>
                  <div >
                    <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                    <button onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                 </div>
                </div>
            ))}

            <h2 >Total: ₹ {total}</h2>
            <button onClick={placeOrder}>Place Order</button>
            <button onClick={() => navigate("/checkout")}>
               Go to Checkout
            </button>
        </div>
    );
}