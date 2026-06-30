import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // ✅ default to "all"
  const categories = ["all", "Electronics", "Fashion", "Footwear", "Stationary", "Furniture"];

  const getProducts = async (category = "all") => {
    try {
      const res = await api.get(`products/?category=${category}`);
      setProducts(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    getProducts(selectedCategory); // ✅ fetch based on category
  }, [selectedCategory]);

  return (
    <div>
      <h2>All Products</h2>

      <div>
        {filteredProducts.map((p) => ( // ✅ use filteredProducts
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 12px",
              background: selectedCategory === cat ? "black" : "#eee",
              color: selectedCategory === cat ? "white" : "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}