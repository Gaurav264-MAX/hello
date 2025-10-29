import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Carrom from "./Carrom.jsx";
import { Box } from "@mui/material";
import "./ProductList.css"; 
import { useNavigate } from "react-router-dom";
import { useFetchAcPartsQuery } from "./apiroute.js"; 
import ResponsiveNavbar from './navbar.jsx';

const Ac = () => {
  const { data: ac, isLoading, error } = useFetchAcPartsQuery();
  // const navigate = useNavigate();

  //   const handleRedirect = () => {
  //       navigate("/acadd"); 
  //   };

  //   const [ac, setac] = useState([]);
    
  //       const fetchProducts = async () => {
  //           try {
  //               const res = await axios.get("http://localhost:3000/ac");
  //               setac(res.data);
  //           } catch (error) {
  //               console.error("Error fetching ac:", error);
  //           }
  //       };
    
  //       useEffect(() => {
  //           fetchProducts();
  //       }, []);

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
        {ac.length > 0 ? (
                  ac.map((product) => (
                      <Carrom key={product._id} product={product} />
                  ))
              ) : (
                  <p>No ac available</p>
              )}
      </Box>
      {/* <button onClick={handleRedirect}>Add</button> */}
      
    </>
  );
};

export default Ac;
