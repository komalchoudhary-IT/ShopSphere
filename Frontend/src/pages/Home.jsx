import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Electronics",
    "Fashion",
    "Footwear",
    "Stationary",
    "Furniture",
  ];

  const getProducts = async (category = "all") => {
    try {
      const url =
        category === "all"
          ? "products/"
          : `products/?category=${category}`;

      const res = await api.get(url);
      setProducts(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="product-container">
      <h2>All Products</h2>

      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <h3>No products found</h3>
        )}
      </div>
    </div>
  );
}