import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await api.get("products/my-products/");

            const product = res.data.find((p) => p.id === Number(id));

            if (product) {
                setForm(product);
            }

        } catch (err) {
            console.log(err.response?.data);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const updateProduct = async () => {
    try {
        const data = new FormData();

        data.append("name", form.name);
        data.append("description", form.description);
        data.append("price", form.price);
        data.append("stock", form.stock);
        data.append("category", form.category);

        if (form.image) {
            data.append("image", form.image);
        }

        await api.put(`products/update/${id}/`, data);

        alert("Product Updated Successfully");
        navigate("/my-products");

    } catch (err) {
        console.log(err.response?.data);
        alert("Update Failed");
    }
};

    return (
        <div className="auth-container edit-product-container" id="edit-product-page">

            <h2>Edit Product</h2>

            <input 
            className="auth-input"
                name="name"
                value={form.name}
                onChange={handleChange}
            />

            <textarea
                className="auth-textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
            />

            <input 
            className="auth-input"
                name="price"
                value={form.price}
                onChange={handleChange}
            />

            <input 
            className="auth-input"
                name="stock"
                value={form.stock}
                onChange={handleChange}
            />

            <input 
            className="auth-input"
                name="category"
                value={form.category}
                onChange={handleChange}
            />

            <input 
            className="auth-input"
            type="file"
           name="image"
            onChange={(e) =>
           setForm({ ...form, image: e.target.files[0] })
            }
          />

            <button className="auth-btn product-btn"
            onClick={updateProduct}>
                Update Product
            </button>

        </div>
    );
}