import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    vendors: 0,
    products: 0,
    categories: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/");

      console.log(res.data);

      setDashboardData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Total Vendors: {dashboardData.vendors}</h2>

      <h2>Total Products: {dashboardData.products}</h2>

      <h2>Total Categories: {dashboardData.categories}</h2>
    </div>
  );
}

export default Dashboard;