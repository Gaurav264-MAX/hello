import React from "react";
import { FaArrowRight } from "react-icons/fa"; // Import Right Arrow Icon
import { useNavigate } from "react-router-dom"; 
import "./Showmore.css"; 
import ShinyText from './ShinyText';

const Showmore = ({ route, disabled = true, className = "" }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(route); 
  };

  return (
    <div className={`showmore-container ${className}`} onClick={handleRedirect} tabIndex={0}>
      <p className="showmore-text">Show More</p> 
      <FaArrowRight className="showmore-icon" />
    </div>
  );
};

export default Showmore;
