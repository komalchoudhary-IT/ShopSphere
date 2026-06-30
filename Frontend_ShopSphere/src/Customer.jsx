import React, { useEffect, useState } from "react";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/customers/")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  const deleteCustomer = async (id) => {
    await fetch(
      `http://127.0.0.1:8000/api/delete-customer/${id}/`
    );

    setCustomers(
      customers.filter((c) => c.id !== id)
    );
  };

  return (
    <div>
      <h2>Manage Customers</h2>

      <input
        type="text"
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers
            .filter(
              (customer) =>
                customer.name
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                customer.email
                  .toLowerCase()
                  .includes(search.toLowerCase())
            )
            .map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>

                <td>
                  <button
                    onClick={() => deleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;