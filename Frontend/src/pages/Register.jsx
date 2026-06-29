import { useState } from "react";
import api from "../api/axios";

export default function Register() {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "customer"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await api.post("accounts/register/", form);
            alert("Registration Success");
            console.log(res.data);
        } catch (err) {
            alert("Error in registration");
        }
    };

    return (
        <div  className="auth-container">
            <h2>Register</h2>

            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />

            <select name="role" onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
            </select>

            <button onClick={handleSubmit}>Register</button>
        </div>
    );
}