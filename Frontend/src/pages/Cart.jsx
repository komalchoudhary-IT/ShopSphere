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
        try {
            await api.put(`cart/update/${id}/`, { quantity: qty });
            getCart();
        } catch (err) {
            console.log(err);
        }
    };

    const removeItem = async (id) => {
        try {
            await api.delete(`cart/remove/${id}/`);
            getCart();
        } catch (err) {
            console.log(err);
        }
    };

    const total = cartItems.reduce(
        (acc, item) => acc + Number(item.product_price) * item.quantity,
        0
    );

    const placeOrder = async () => {
        try {
            await api.post("orders/place/");
            alert("Order Placed Successfully");
            setCartItems([]);
            navigate("/orders");
        } catch (err) {
            alert("Order Failed");
        }
    };

    return (
        <div className="cart-container" id="cart-page">
            <h2>Your Cart</h2>

            {cartItems.length === 0 ? (
                <h3>Your cart is empty.</h3>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="cart-item"
                            id={`cart-item-${item.id}`}
                        >
                            <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="product-image"
                            />

                            <div className="cart-details">
                                <h3>{item.product_name}</h3>

                                <p>₹ {item.product_price}</p>

                                <div className="quantity-section">
                                    <p className="quantity-text">
                                        Qty: <span>{item.quantity}</span>
                                    </p>

                                    <button
                                        className="qty-btn decrease-btn"
                                        onClick={() => {
                                            if (item.quantity > 1) {
                                                updateQty(
                                                    item.id,
                                                    item.quantity - 1
                                                );
                                            }
                                        }}
                                    >
                                        -
                                    </button>

                                    <button
                                        className="qty-btn increase-btn"
                                        onClick={() =>
                                            updateQty(
                                                item.id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="cart-summary">
                        <h2>Total: ₹ {total}</h2>

                        <button
                            className="place-order-btn"
                            onClick={placeOrder}
                        >
                            Place Order
                        </button>

                        <button
                            className="checkout-btn"
                            onClick={() => navigate("/checkout")}
                        >
                            Go to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}