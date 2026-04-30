import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/editProduct.css";
import {baseUrl} from "./pages/Urls";
function EditProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    file: ""
  });

  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("description", product.description);

    if (newFile) {
      formData.append("file", newFile);
    }

    await axios.put(`${baseUrl}/products/${id}`, formData);

    alert("Product updated");
    navigate("/manageproducts");
  };

  return (
    <div className="edit-container">
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Makeup">Makeup</option>
          <option value="Skin">Skin</option>
        </select>

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        ></textarea>
{product.file && !newFile && (
  <img
    src={`${baseUrl}/images/${product.file}`}
    alt="Current Product"
    width="120"
  />
)}

{newFile && (
  <img
    src={URL.createObjectURL(newFile)}
    alt="New Product"
    width="120"
  />
)}
        <input type="file" onChange={handleFileChange} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;