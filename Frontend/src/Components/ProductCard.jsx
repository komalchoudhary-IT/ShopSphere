import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ProductCard({ product, refreshProducts }) {

    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const addToCart = async () => {
        try {
            await api.post("cart/add/", {
                product: product.id,
                quantity: 1
            });

            alert("Added to Cart");
        } catch (err) {
            alert("Login required");
        }
    };

    const deleteProduct = async () => {
        try {
            await api.delete(`products/delete/${product.id}/`);

            alert("Product Deleted");

            if (refreshProducts) {
                refreshProducts();
            }

        } catch (err) {
            alert("Delete Failed");
        }
    };

    return (
        <div
            className="product-card"
            id={`product-${product.id}`}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer" }}
        >
            <img
                src={
                    product.image
                        ? product.image.startsWith("http")
                            ? product.image
                            : `http://127.0.0.1:8000${product.image}`
                        : "https://via.placeholder.com/200"
                }
                alt={product.name}
                className="product-image"
            />

            <h3 className="product-title">{product.name}</h3>

            <p className="product-description">{product.description}</p>

            <h4 className="product-price">₹ {product.price}</h4>

            {/* Customer */}
            {role === "customer" && (
                <button
                    className="cart-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation
                        addToCart();
                    }}
                >
                    Add to Cart
                </button>
            )}

            {/* Vendor */}
            {role === "vendor" && (
                <>
                    <button
                        className="edit-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            // We'll implement edit later
                        }}
                    >
                        Edit
                    </button>

                    <button
                        className="delete-btn"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent navigation
                            deleteProduct();
                        }}
                    >
                        Delete
                    </button>
                </>
            )}
        </div>
    );
}