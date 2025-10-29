import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Carrom from "./Carrom.jsx";
import { Box } from "@mui/material";
import "./ProductList.css"; 
import { useNavigate } from "react-router-dom"; 
import { useFetchMachinesQuery } from "./apiroute.js";
import ResponsiveNavbar from './navbar.jsx';


const Washingmachine = () => {
    
    const { data: machines, isLoading, error } = useFetchMachinesQuery();

    // const handleRedirect = () => {
    //     navigate("/machine"); 
    // };

    // const [machines, setMachines] = useState([]);
    
    //     const fetchProducts = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:3000/machine");
    //             setMachines(res.data);
    //         } catch (error) {
    //             console.error("Error fetching machines:", error);
    //         }
    //     };
    
    //     useEffect(() => {
    //         fetchProducts();
    //     }, []);

  return (
    <>
      <ResponsiveNavbar />
      <Box sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 0,
        backgroundColor: "white",
        minHeight: "100vh",
        padding: "20px 10px",
        justifyContent: "flex-start",
        maxWidth: "100%"
      }}>
      {machines.length > 0 ? (
                machines.map((product) => (
                    <Carrom key={product._id} product={product} />
                ))
            ) : (
                <p>No machines available</p>
            )}
        </Box>
      {/* <button onClick={handleRedirect}>Add</button> */}
    </>
  );
};

export default Washingmachine;
