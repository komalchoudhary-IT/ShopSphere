import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/orders/")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

const [orderCount, setOrderCount] = useState(0);

useEffect(() => {
  fetch("http://127.0.0.1:8000/orders/")
    .then(res => res.json())
    .then(data => setOrderCount(data.length));
}, []);

  return (
    <div>
      <h2>Manage Orders</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>₹{order.total_amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
        <div className="card">
  <h3>Total Orders</h3>
  <h2>{orderCount}</h2>
</div>
      </table>
    </div>
  );
}

export default Orders;