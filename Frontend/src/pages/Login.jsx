import { useState } from "react";
import api from "../api/axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("accounts/login/", {
                username,
                password
            });

            localStorage.setItem("access", res.data.access);
            alert("Login Success");
        } catch (err) {
            alert("Login Failed");
        }
    };

    return (
        <div  className="auth-container">
            <h2>Login</h2>

            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}