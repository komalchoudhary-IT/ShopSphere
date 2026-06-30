import { useEffect, useState } from "react";
import api from "../api/axios";

export default function VendorDashboard() {
    const [dashboard, setDashboard] = useState({
        total_products: 0,
        total_orders: 0,
        total_sales: 0,
        total_revenue: 0,
    });

    const getDashboard = async () => {
        try {
            const res = await api.get("products/vendor-dashboard/");
            setDashboard(res.data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        getDashboard();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Vendor Dashboard</h2>

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    <h3>Total Products</h3>
                    <p>{dashboard.total_products}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Orders</h3>
                    <p>{dashboard.total_orders}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Sales</h3>
                    <p>{dashboard.total_sales}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Revenue</h3>
                    <p>₹ {dashboard.total_revenue}</p>
                </div>

            </div>
        </div>
    );
}