import { useEffect, useState } from "react";
import axios from "axios";
import Carrom from "./Carrom.jsx";
import ProductForm from "./ProductForm.jsx";
import { Box } from "@mui/material";

const ProductList1 = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await axios.get("http://localhost:3000/product");
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <ProductForm onProductAdded={fetchProducts} />
            {products.map((product) => (
                <Carrom key={product._id} product={product} />
            ))}
        </Box>
    );
};

export default ProductList1;
