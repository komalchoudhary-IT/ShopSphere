import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../Components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getProducts = async (category = "all") => {
    try {
      const url =
        category && category !== "all"
          ? `products/?category=${category}`
          : `products/`;
      const res = await api.get(url);
      setProducts(res.data);
    } catch (err) {
      console.log(err.response || err);
    }
  };

  const getCategories = async () => {
    try {
      const res = await api.get("products/categories/");
      setCategories(["all", ...res.data.map((cat) => cat.name)]);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="home-container">
      {/* <h2 className="home-title">All Products</h2> */}

      {/* Categories bar */}
      <div className="categories-container">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="promo-banner-box">
        
        <div className="promo-banner-content">
          <h2>Welcome to ShopSphere</h2>
          <p>Find it. Love it. Buy it. Elevate your everyday essentials today.</p>
        </div>
      </div>

      {/* Products grid */}
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="product-box" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <p className="no-products">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
