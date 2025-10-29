import { useState, useEffect } from "react";
import axios from "axios";
import './ProductForm.css';

const ProductForm = ({ onProductAdded, route, initialProduct, method = 'post', isEdit = false }) => {
    const [product, setProduct] = useState({
        title: "", image: null, image2: null, image3: null, newprice: "", oldprice: "", discount: "", 
        delivery: "", description: "", feature: [], heading: "",stock:"",
        ...(initialProduct || {})
    });
    const [newFeature, setNewFeature] = useState(""); // State for new feature input

    useEffect(() => {
        if (initialProduct) {
            setProduct(prev => ({
                ...prev,
                ...initialProduct,
                feature: Array.isArray(initialProduct.feature) ? initialProduct.feature : [],
            }));
        }
    }, [initialProduct]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (files) {
            setProduct({ ...product, [name]: files[0] }); // For image, image2, image3
        } else {
            setProduct({ ...product, [name]: value });
        }
    };
    

    const handleFeatureChange = (e) => {
        setNewFeature(e.target.value); // Update new feature input
    };

    const handleAddFeature = () => {
        if (newFeature && !product.feature.includes(newFeature)) {
            setProduct((prev) => ({
                ...prev,
                feature: [...prev.feature, newFeature] // Add feature to the array
            }));
            setNewFeature(""); // Clear input after adding
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append("title", product.title);
            // For images: if it's a File, append the file; if it's a string, append the path (for backend to keep old image)
            if (product.image instanceof File) {
                formData.append("image", product.image);
            } else if (typeof product.image === 'string') {
                formData.append("image", product.image);
            }
            if (product.image2 instanceof File) {
                formData.append("image2", product.image2);
            } else if (typeof product.image2 === 'string') {
                formData.append("image2", product.image2);
            }
            if (product.image3 instanceof File) {
                formData.append("image3", product.image3);
            } else if (typeof product.image3 === 'string') {
                formData.append("image3", product.image3);
            }
            formData.append("newprice", product.newprice);
            formData.append("oldprice", product.oldprice);
            formData.append("discount", product.discount);
            formData.append("delivery", product.delivery);
            formData.append("description", product.description);
            formData.append("feature", JSON.stringify(product.feature)); // Send array as JSON string
            formData.append("heading", product.heading);
            formData.append("stock", product.stock);
            console.log("Image file:", product.image);

            let response;
            if (isEdit) {
                response = await axios[method](route, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axios.post(route, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            console.log("Response:", response.data);

            setProduct({ title: "", image: null, newprice: "", oldprice: "", discount: "", delivery: "", description: "", feature: [], heading: "" });
            setNewFeature("");
            onProductAdded(); // Refresh the list
    
        } catch (error) {
            console.error("Error adding product:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} required />
            {/* Show existing images if present (edit mode) */}
            {product.image && typeof product.image === 'string' && (
                <img src={product.image.startsWith('data:') ? product.image : `http://localhost:3000${product.image}`} alt="Current" style={{ maxWidth: 120, marginBottom: 8 }} />
            )}
            <input type="file" name="image" onChange={handleChange} accept="image/*" required={!product.image} />
            {product.image2 && typeof product.image2 === 'string' && (
                <img src={product.image2.startsWith('data:') ? product.image2 : `http://localhost:3000${product.image2}`} alt="Current 2" style={{ maxWidth: 120, marginBottom: 8 }} />
            )}
            <input type="file" name="image2" onChange={handleChange} accept="image/*" required={!product.image2} />
            {product.image3 && typeof product.image3 === 'string' && (
                <img src={product.image3.startsWith('data:') ? product.image3 : `http://localhost:3000${product.image3}`} alt="Current 3" style={{ maxWidth: 120, marginBottom: 8 }} />
            )}
            <input type="file" name="image3" onChange={handleChange} accept="image/*" required={!product.image3} />
            <input type="number" name="newprice" placeholder="New Price" value={product.newprice} onChange={handleChange} required />
            <input type="number" name="oldprice" placeholder="Old Price" value={product.oldprice} onChange={handleChange} required />
            <input type="number" name="discount" placeholder="Discount" value={product.discount} onChange={handleChange} required />
            <input type="text" name="delivery" placeholder="Delivery" value={product.delivery} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
            <input type="number" name="stock" placeholder="enter sku" value={product.stock} onChange={handleChange} required />
            {/* Feature input field */}
            <div>
                <input type="text" name="feature" placeholder="Feature" value={newFeature} onChange={handleFeatureChange} />
                <button type="button" onClick={handleAddFeature}>Add Feature</button>
            </div>

            {/* Display added features */}
            <div>
                <ul>
                    {(product.feature || []).map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>

            <input type="text" name="heading" placeholder="Type" value={product.heading} onChange={handleChange} required />
            <button type="submit">{isEdit ? 'Update Product' : 'Add Product'}</button>
        </form>
    );
};

export default ProductForm;
