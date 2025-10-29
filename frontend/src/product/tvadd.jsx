import { useEffect, useState } from "react";
import axios from "axios";
import Carrom from "../Carrom.jsx";
import ProductForm from "../ProductForm.jsx";
import { Box } from "@mui/material";

const TvList1 = () => {
    const [tv, setTv] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/tv");
            setTv(res.data);
        } catch (error) {
            console.error("Error fetching Tv:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <ProductForm onProductAdded={fetchProducts} route="http://localhost:3000/tv" />
            {/* {tv.length > 0 ? (
                tv.map((product) => (
                    <Carrom key={product._id} product={product} />
                ))
            ) : (
                <p>No tv available</p>
            )} */}
        </Box>
    );
};

export default TvList1;
