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
            if (err.response?.data?.username) {
        alert(err.response.data.username[0]);
    } else {
        alert("Registration Failed");
    }
        }
    };

    return (
        <div  className="auth-container" id="register-container">
            <h2>Register</h2>

            <input className="auth-input" name="username" placeholder="Username" onChange={handleChange} />
            <input className="auth-input" name="email" placeholder="Email" onChange={handleChange} />
            <input className="auth-input" name="password" type="password" placeholder="Password" onChange={handleChange} />

            <select className="auth-select" name="role" onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
            </select>

            <button className="auth-btn" onClick={handleSubmit}>Register</button>
        </div>
    );
}