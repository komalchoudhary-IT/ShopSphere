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

    return (
        <div className ="order-card">
            <h2>My Orders</h2>

            {orders.map((order) => (
                <div key={order.id} style={{ border: "1px solid black", margin: 10, padding: 10 }}>
                    <h3>Order ID: {order.id}</h3>
                    <p>Status: {order.status}</p>
                    <p>Total: ₹{order.total_price}</p>

                    <h4>Items:</h4>
                    {order.items.map((item) => (
                        <p key={item.id}>
                            {item.product_name} - Qty: {item.quantity}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}