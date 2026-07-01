import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ProductCard({ product, refreshProducts }) {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const addToCart = async () => {
        const token = localStorage.getItem("access");
        const role = localStorage.getItem("role");

        if (!token || role !== "customer") {
            navigate("/login");
            return;
        }

        try {
            await api.post("cart/add/", {
                product: product.id,
                quantity: 1,
            });
            alert("Added to Cart");
        } catch (err) {
            console.log(err.response || err);
            if (err.response && err.response.status === 401) {
                navigate("/login");
                return;
            }
            alert("Failed to add to cart");
        }
    };

    const editProduct = () => {
        navigate(`/edit-product/${product.id}`);
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
        <div className="product-card" id={`product-${product.id}`}>
            <div className="product-image-wrapper">
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
            </div>

            <div className="product-card-body">
                <div className="product-info-row">
                    <h3 className="product-title">{product.name}</h3>
                    {product.stock !== undefined && product.stock !== null && (
                        <span className="product-stock">{product.stock} left</span>
                    )}
                </div>
                <p className="product-description">{product.description}</p>
                <div className="price-row">
                    <span className="product-price">₹ {product.price}</span>
                </div>
            </div>

            <div className="product-actions">
                {role === "customer" && (
                    <button
                        className="cart-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart();
                        }}
                    >
                        Add to Cart
                    </button>
                )}
                {role === "vendor" && (
                    <>
                        <button
                            className="edit-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                editProduct();
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteProduct();
                            }}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
