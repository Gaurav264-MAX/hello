import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './components/context/CartContext';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import './StyledProductCard.css';

const StyledProductCard = ({ product }) => {
    const { _id, title, description, image, newprice, productType } = product || {};
    const navigate = useNavigate();
    const { addToCart } = useCart();
    


    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        toast.success('Added to cart!');
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        // Add to cart first, then navigate to delivery
        addToCart(product);
        toast.success('Added to cart! Redirecting to checkout...');
        navigate('/delivery');
    };

    const handleCardClick = () => {
        const route = productType === 'machine' ? 'washingmachine' : productType;
        navigate(`/${route}/${_id}`);
    };



    return (
        <div className="styled-product-card" onClick={handleCardClick}>
            <div className="card-image-container">
                <img 
                    src={image} 
                    alt={title || "Product"} 
                    className="card-image main-image"
                />
                {product.image2 && (
                  <img
                    src={product.image2}
                    alt={title + ' alt'}
                    className="card-image hover-image"
                  />
                )}
            </div>
            
            <div className="card-content">
                <h3 className="product-title">{title || "Product Title"}</h3>
                
                <div className="price-container">
                    <span className="price">₹{newprice || "0"}</span>
                </div>
                
                <div className="card-actions">
                    <button 
                        className="action-btn buy-now-btn" 
                        onClick={handleBuyNow}
                    >
                        <FaCreditCard className="btn-icon" />
                        Buy Now
                    </button>
                    <button 
                        className="action-btn add-to-cart-btn" 
                        onClick={handleAddToCart}
                    >
                        <FaShoppingCart className="btn-icon" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StyledProductCard; 