import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
     const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("accounts/login/", {
                username,
                password
            });
             localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("username", res.data.username);
            
            if (res.data.role === "vendor") {
              navigate("/my-products");
            } else {
               navigate("/");
            }
        } catch (err) {
            console.log(err);
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log("Message:", err.message);

    alert(err.message);
        }
    };

    return (
        <div  className="auth-container" id="login-container">
            <h2
            className="auth-title"
            >Login</h2>

            <input
                className="auth-input"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                className="auth-input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="auth-btn" onClick={handleLogin}>Login</button>
        </div>
    );
}