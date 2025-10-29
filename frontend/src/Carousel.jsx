import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";
import Image1 from "./assets/Image1.png";
import Image2 from "./assets/Image2.png";
import Image3 from "./assets/Image3.png";
import Button from "./Button.jsx";
import Cart from "./ButtonCart.jsx";
import { Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from './components/context/CartContext.jsx';
import { toast } from 'react-toastify';
import { useAuthStatus } from "./AuthWrapper.jsx";
const ProductPage = ({product}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { status } = useAuthStatus();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Item added to cart!');
  };

  const handleBuyNow = () => {
    if (status == 'false') {
      navigate('/signup')
    }else{
 navigate('/delivery');
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
     
        <div className="col-md-6">
         
          <div id="productCarousel" className="carousel slide" data-bs-ride="carousel" style={{ width: "100%", height: "400px" }}>
            <div className="carousel-inner" style={{ height: "100%" }}>
              <div className="carousel-item active" style={{ height: "100%" }}>
                <img src={product.image} className="d-block w-100 h-100" alt="Product 1" style={{ objectFit: "contain", backgroundColor: "#f8f9fa" }} />
              </div>
              <div className="carousel-item" style={{ height: "100%" }}>
                <img src={product.image2} className="d-block w-100 h-100" alt="Product 2" style={{ objectFit: "contain", backgroundColor: "#f8f9fa" }} />
              </div>
              <div className="carousel-item" style={{ height: "100%" }}>
                <img src={product.image3} className="d-block w-100 h-100" alt="Product 3" style={{ objectFit: "contain", backgroundColor: "#f8f9fa" }} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

     
          <div className="features p-4 text-left" style={{ backgroundColor: "#f8f9fa", width: "100%" }}>
            <Typography variant="h6" fontFamily="'Poppins', sans-serif" fontWeight={600}>Product Features:</Typography>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {(() => {
                let features = [];
                if (Array.isArray(product.feature)) {
                  features = product.feature;
                } else if (typeof product.feature === 'string') {
                  try {
                    const parsed = JSON.parse(product.feature);
                    if (Array.isArray(parsed)) {
                      features = parsed;
                    } else {
                      features = [product.feature];
                    }
                  } catch {
                    features = [product.feature];
                  }
                }
                return features && features.length > 0 ? (
                  features.map((feature, index) => (
                   <li key={index}>{feature}</li>
                  ))
                ) : (
                  <li>No features available.</li>
                );
              })()}
            </ul>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", height: "50px", width: "100%" }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }} onClick={handleBuyNow}>
                <Button />
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }} onClick={handleAddToCart}>
                <Cart />
              </div>
            </div>
          </div>
        </div>

        
        <div className="col-md-6">
          <div className="card border-0 h-100 p-4">
            <div className="card-body">
          
              <Typography variant="h5" gutterBottom fontFamily="'Poppins', sans-serif" fontWeight={600}>
                {product.title}
              </Typography>

              <div className="d-flex align-items-center">
                {product.discount && (
                  <span className="text-danger fw-bold fs-4">{product.discount}% OFF</span>
                )}
                <span className="ms-2 fw-bold fs-3">₹{product.newprice}</span>
              </div>
              {product.oldprice && (
                <p className="text-muted text-decoration-line-through mb-1">M.R.P: ₹{product.oldprice}</p>
              )}
              <p className="text-secondary">Inclusive of all taxes</p>

              
              <div className="border-top pt-2">
                <p className="text-primary small">
                  <strong>Available Payment Options</strong>
                </p>
                <ul className="list-unstyled small">
                  <li>✓ UPI Payment</li>
                  <li>✓ Card Payment</li>
                  <li>✓ Cash on Delivery</li>
                </ul>
              </div>

            
              <div className="border-top pt-2">
                <p className="fw-bold">Special Offers</p>
                <p className="small">
                  <strong>₹100 off</strong> on orders above ₹1,000 on <strong>Bank Debit Cards</strong>
                </p>
                {product.newprice < 1000 && (
                  <p className="text-muted small">Add items worth ₹{1000 - product.newprice} to avail offer</p>
                )}
              </div>

             
              <div className="border-top pt-2">
                <p className="fw-bold">Warranty</p>
                <p className="small">1 Year Manufacturer Warranty</p>
              </div>

              <div className="border-top pt-2">
                <p className="fw-bold fs-5">Total: ₹{product.newprice}</p>
                <p className="text-primary small">
                  <strong>FREE delivery</strong> within 3-5 business days
                </p>
                <p className="small text-muted">
                  Express delivery available for select locations
                </p>
              </div>

              {product.delivery && (
                <div className="border-top pt-2 small">
                  Deliver to <strong>{product.delivery}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

     
      <div className="row g-0 mt-4">
        <div className="col-12">
          <Box sx={{ width: '100%', px: 0 }}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3,
                borderRadius: 0,
                bgcolor: 'background.paper'
              }}
            >
              <Typography variant="h5" gutterBottom fontFamily="'Poppins', sans-serif" fontWeight={600}>
                Frequently Asked Questions
              </Typography>
              <div className="mt-3 d-flex flex-wrap gap-2">
                <button className="btn btn-outline-primary btn-sm flex-grow-1">
                  What is the warranty period?
                </button>
                <button className="btn btn-outline-primary btn-sm flex-grow-1">
                  Is installation service available?
                </button>
                <button className="btn btn-outline-primary btn-sm flex-grow-1">
                  Do you provide after-sales support?
                </button>
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;