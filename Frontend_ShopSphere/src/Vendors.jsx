import { useEffect, useState } from "react";
import axios from "axios";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchVendors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/vendors/");
      setVendors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const addVendor = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/vendors/", {
        name,
        email,
        phone,
      });

      setName("");
      setEmail("");
      setPhone("");

      fetchVendors();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVendor = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/delete-vendor/${id}/`
      );

      fetchVendors();
    } catch (error) {
      console.log(error);
    }
  };

  const approveVendor = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/approve-vendor/${id}/`
      );

      fetchVendors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vendor Management</h1>

      <h3>Add Vendor</h3>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <button onClick={addVendor}>
        Add Vendor
      </button>

      <hr />

      <h2>Vendor List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.name}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.status}</td>

              <td>
                <button
                  onClick={() => approveVendor(vendor.id)}
                >
                  Approve
                </button>
              </td>

              <td>
                <button
                  onClick={() => deleteVendor(vendor.id)}
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

export default Vendors;