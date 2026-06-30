import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/profile/")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Profile</h1>

      <div
        style={{
          maxWidth: "500px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h3>{user.name}</h3>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <p>
          <strong>Phone:</strong> {user.phone}
        </p>

        <button>Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;