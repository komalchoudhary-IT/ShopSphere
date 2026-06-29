import { useEffect, useState } from "react";
import api from "../api/axios";

export default function VendorOrders() {

    const [orders, setOrders] = useState([]);

    const getVendorOrders = async () => {
        try {
            const res = await api.get("orders/vendor-orders/");
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getVendorOrders();
    }, []);

    return (
        <div className="order-card">
            <h2>Vendor Orders</h2>

            {orders.map((item, index) => (
                <div key={index} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
                    <h3>Order ID: {item.order_id}</h3>
                    <p>Product: {item.product}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Customer: {item.customer}</p>
                    <p>Status: {item.status}</p>
                </div>
            ))}
        </div>
    );
}