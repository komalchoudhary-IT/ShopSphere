import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const res = await api.get(`products/${id}/`);

                setProduct(res.data);

            } catch (err) {

                console.log(err);

            }

        };

        fetchProduct();

    }, [id]);

    if (!product) {

        return <h2>Loading...</h2>;

    }

    const addToCart = async () => {
  try {
    await api.post("cart/add/", {
      product: product.id,
      quantity: 1,
    });

    alert("Added to Cart");
  } catch (err) {
    alert("Please login first.");
    console.log(err.response);
  }
};

    return (

        <div className="details-container">

            <img
                src={
                    product.image
                        ? product.image.startsWith("http")
                            ? product.image
                            : `http://127.0.0.1:8000${product.image}`
                        : "https://via.placeholder.com/400"
                }
                className="details-image"
            />

            <div className="details-info">

                <h1>{product.name}</h1>

                <h2>₹ {product.price}</h2>

                <p>{product.description}</p>

                <p>Stock : {product.stock}</p>

                <button className="cart-btn" onClick={addToCart}>
                Add To Cart
               </button>

            </div>

        </div>

    );

}