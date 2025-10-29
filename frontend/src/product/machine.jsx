import { useEffect, useState } from "react";
import axios from "axios";
import Carrom from "../Carrom.jsx";
import ProductForm from "../ProductForm.jsx";
import { Box } from "@mui/material";

const MachineList1 = () => {
    const [machines, setMachines] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/machine");
            setMachines(res.data);
        } catch (error) {
            console.error("Error fetching machines:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <ProductForm onProductAdded={fetchProducts} route="http://localhost:3000/machine" />
            {/* {machines.length > 0 ? (
                machines.map((product) => (
                    <Carrom key={product._id} product={product} />
                ))
            ) : (
                <p>No machines available</p>
            )} */}
        </Box>
    );
};

export default MachineList1;
