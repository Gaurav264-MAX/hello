import { useEffect, useState } from "react";
import axios from "axios";
import Carrom from "../Carrom.jsx";
import ProductForm from "../ProductForm.jsx";
import { Box } from "@mui/material";

const AcList1 = () => {
    const [ac, setAc] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/ac");
            setAc(res.data);
        } catch (error) {
            console.error("Error fetching Ac:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <ProductForm onProductAdded={fetchProducts} route="http://localhost:3000/ac" />
            {/* {ac.length > 0 ? (
                ac.map((product) => (
                    <Carrom key={product._id} product={product} />
                ))
            ) : (
                <p>No ac available</p>
            )} */}
        </Box>
    );
};

export default AcList1;
