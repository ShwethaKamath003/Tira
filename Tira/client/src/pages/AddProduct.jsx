import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/AddProduct.css";
import {baseUrl} from "./urls";
function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const upload = async (e) => {
    e.preventDefault();

    if (!name || !price || !category || !description || !file) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", file);

    try {
      await axios.post(`${baseUrl}/upload`, formData);
      alert("Product added successfully");

      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setFile(null);
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>Admin</h2>

        <button onClick={() => navigate("/addproduct")}>
          Add Product
        </button>

        <button onClick={() => navigate("/viewproduct")}>
          View Product
        </button>

        <button onClick={() => navigate("/manageproducts")}>
          Manage Product
        </button>
      </div>

      <div className="content">
        <h2 className="title">Add Product</h2>

        <div className="form">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Makeup">Makeup</option>
            <option value="Skin">Skin</option>
            <option value="Hair">Hair</option>
            <option value="Fragrance">Fragrance</option>
            <option value="Wellness">Wellness</option>
            <option value="Bath and Body">Bath and Body</option>
            <option value="Men">Men</option>
          </select>

          <textarea
            className="description-box"
            placeholder="Enter Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button className="add-btn" onClick={upload}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;