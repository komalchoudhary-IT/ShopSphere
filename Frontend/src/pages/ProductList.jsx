import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../Components/ProductCard";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await api.get("products/");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="product-container" id="product-list-page">
            <h2>All Products</h2>

            <div className="products-grid">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} refreshProducts={fetchProducts} />
                ))}
            </div>
        </div>
    );
}