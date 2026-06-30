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
        <div className="vendor-order-item" id="vendor-orders-page">
            <h2>Vendor Orders</h2>

       {orders.map((item, index) => (
    <div
        key={index}
        className="vendor-order-item"
        id={`vendor-order-${item.order_id}`}
    >
        <img
            src={
                item.product_image
                    ? item.product_image.startsWith("http")
                        ? item.product_image
                        : `http://127.0.0.1:8000${item.product_image}`
                    : "https://placehold.co/100x100"
            }
            alt={item.product}
            className="order-product-image"
        />

          <div className="vendor-order-details">
        <h3>Order ID: {item.order_id}</h3>

        <p><strong>Product:</strong> {item.product}</p>

        <p><strong>Quantity:</strong> {item.quantity}</p>

        <p><strong>Price:</strong> ₹{item.price}</p>

        <p className="customer-name">
            <strong>Customer:</strong> {item.customer}
        </p>

        <span className="order-status">
            {item.status}
        </span>
    </div>
    </div>
))}
       
</div>
    );
}