import api from "../api/axios";

export default function ProductCard({ product }) {

    const addToCart = async () => {
        try {
            await api.post("cart/add/", {
                product: product.id,
                quantity: 1
            });

            alert("Added to cart");
        } catch (err) {
            alert("Login required or error");
        }
    };

    return (
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>₹ {product.price}</p>

            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}