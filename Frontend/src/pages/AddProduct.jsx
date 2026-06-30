import { useState ,useEffect} from "react";
import api from "../api/axios";


export default function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null
    });
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
        ...form,
        [name]: name === "image" ? files[0] : value
    });
};

//     const handleSubmit = async () => {
//     try {
//         const formData = new FormData();

//         formData.append("name", form.name);
//         formData.append("description", form.description);
//         formData.append("price", form.price);
//         formData.append("stock", form.stock);
//         formData.append("category", form.category);
//         formData.append("image", form.image);
        

//         if (form.image) {
//             formData.append("image", form.image);
//         }

//         await api.post("products/add/", formData);

//         alert("Product Added Successfully!");
//     } catch (err) {
//         console.log(err.response?.data);
//         alert("Failed to add product");
//     }
// };
const handleSubmit = async () => {
    try {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("stock", form.stock);
        formData.append("category", form.category); // ID now
        formData.append("image", form.image);

        await api.post("products/add/", formData);

        alert("Product Added Successfully!");
    } catch (err) {
        console.log(err.response?.data);
        alert("Failed to add product");
    }
};
useEffect(() => {
    const getCategories = async () => {
        try {
            const res = await api.get("products/categories/");
            setCategories(res.data);
            console.log(categories);
        } catch (err) {
            console.log(err.response);
        }
    };

    getCategories();
}, []);

    return (
        <div className="auth-container add-product-container" id="add-product-page">
            <h2>Add Product</h2>

            <input
                className="auth-input"
                name="name"
                placeholder="Product Name"
                onChange={handleChange}
            />

            <textarea 
                className="auth-textarea"
                name="description"
                placeholder="Description"
                onChange={handleChange}
            />

            <input
                className="auth-input"
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
            />

           <select
            className="auth-input"
            name="category"
             value={form.category}
           onChange={handleChange}
>
         <option value="">Select Category</option>

         {categories.map((cat) => (
         <option key={cat.id} value={cat.id}>
            {cat.name}
         </option>
        ))}
       </select>
            <input 
                className="auth-input"
               type="file"
               name="image"
               onChange={handleChange}
            />

            <button className="auth-btn product-btn" onClick={handleSubmit}>
                Add Product
            </button>
        </div>
    );
}