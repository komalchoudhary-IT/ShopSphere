import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../Components/ProductCard";

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

    return (
        <div className="container my-products-container" id="vendor-products-page" >
            <h2>My Products</h2>

            {products.length > 0 ? (
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            refreshProducts={fetchProducts}
                        />
                    ))}
                </div>
            ) : (
                <p className="no-products">No products found.</p>
            )}
        </div>
    );
}