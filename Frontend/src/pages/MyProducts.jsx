import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function MyProducts() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await api.get("products/my-products/");
            setProducts(res.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            await api.delete(`products/delete/${id}/`);
            alert("Product Deleted");
            fetchProducts();
        } catch (err) {
            alert("Delete Failed");
        }
    };

    return (
        <div className="container my-products-container" id="vendor-products-page" >
            <h2>My Products</h2>

            {products.map((product) => (
                <div className="product-card vendor-product-card"key={product.id}>
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
                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

                    <h4>₹ {product.price}</h4>

                    <p>Stock : {product.stock}</p>

                    <div style={{display:"flex",gap:"10px"}}>

                        <Link to={`/edit-product/${product.id}`}>
                            <button
                                className="edit-btn"
                            >Edit</button>
                        </Link>

                        <button
                            className="delete-btn"
                            onClick={() => deleteProduct(product.id)}
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ))}
        </div>
    );
}