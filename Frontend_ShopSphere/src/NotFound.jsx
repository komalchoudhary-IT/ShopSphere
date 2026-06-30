import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "60px" }}>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>

      <Link to="/">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}

export default NotFound;