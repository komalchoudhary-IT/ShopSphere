import { useState } from "react";

function ChangePassword() {
  const [form, setForm] = useState({
    username: "",
    old_password: "",
    new_password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/change-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="old_password" placeholder="Old Password" type="password" onChange={handleChange} />
        <input name="new_password" placeholder="New Password" type="password" onChange={handleChange} />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;