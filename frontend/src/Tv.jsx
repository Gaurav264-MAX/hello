import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Carrom from "./Carrom.jsx";
import { Box } from "@mui/material";
import "./ProductList.css"; 
import { useNavigate } from "react-router-dom";
import { useFetchTvPartsQuery } from "./apiroute.js";
import ResponsiveNavbar from './navbar.jsx';

const Tv = () => {
  const { data: tv=[], isLoading, error } = useFetchTvPartsQuery();
  // const navigate = useNavigate();

  //   const handleRedirect = () => {
  //       navigate("/tvadd"); 
  //   };

  //   const [tv, settv] = useState([]);
    
  //       const fetchProducts = async () => {
  //           try {
  //               const res = await axios.get("http://localhost:3000/tv");
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
        {tv.length > 0 ? (
                  tv.map((product) => (
                      <Carrom key={product._id} product={product} />
                  ))
              ) : (
                  <p>No tv available</p>
              )}
      </Box>
      {/* <button onClick={handleRedirect}>Add</button> */}
    </>
  );
};

export default Tv;
