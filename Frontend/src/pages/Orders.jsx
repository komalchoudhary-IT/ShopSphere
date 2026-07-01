import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const res = await api.get("orders/my-orders/");
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const grandTotal = orders.reduce(
        (acc, order) => acc + Number(order.total_price || 0),
        0
    );

    return (
        <div className ="order-card" id="customer-orders-page" >
            <h2>My Orders</h2>

            {orders.map((order) => (
                <div className="single-order-card" id={`order-${order.id}`} key={order.id} >
                    <h3>Order ID: {order.id}</h3>
                    <p>Status: {order.status}</p>
                    <p>Total: ₹{order.total_price}</p>

                    <h4>Items:</h4>
                    {order.items.map((item) => (
                        <div key={item.id} className="order-item-row">
                            <img 
                                src={
                                    item.product_image
                                    ? item.product_image.startsWith("http")
                                        ? item.product_image
                                        : `http://127.0.0.1:8000${item.product_image}`
                                    : "https://placehold.co/100x100"
                                }
                                alt={item.product_name}
                                className="product-image order-product-image" 
                            />
                            <div className="order-item-detail">
                                <p>{item.product_name}</p>
                                <p>Qty: {item.quantity}</p>
                                <p>Price: ₹{item.product_price}</p>
                                <p>Subtotal: ₹{item.product_price * item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {orders.length > 0 && (
                <div className="orders-grand-total">
                    <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
}