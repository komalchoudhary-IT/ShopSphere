import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("products/");
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-container" id="product-list-page">
            <h2>All Products</h2>

            <div className="product-grid">
                {products.map((p) => (
                    <div className="product-card" className="product-card" id={`product-${p.id}`} key={p.id}>
                        
                        <img
                            src={
                                p.image
                                    ? (p.image.startsWith("http")
                                        ? p.image
                                        : `http://127.0.0.1:8000${p.image}`)
                                    : "https://via.placeholder.com/200"
                            }
                            alt={p.name}
                            className="product-image"
                        />

                        <h3 className="product-title" >{p.name}</h3>
                        <p className="product-description">{p.description}</p>
                        <p className="product-price">₹ {p.price}</p>
                        <p className="product-stock" >Stock: {p.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}