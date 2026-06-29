import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const res = await api.get("products/");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <h2>All Products</h2>
           <div>
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
            </div>
        </div>
    );
}