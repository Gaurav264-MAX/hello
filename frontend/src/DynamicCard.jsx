import React, { useState, useEffect } from 'react';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import Cards from './Card.jsx';
import axios from "axios";
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductPage from './Carousel.jsx';
import ReviewForm from './ReviewForm.jsx';
import Reviews from './Reviews.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchProductByIdQuery, useFetchOtherProductsQuery } from './apiroute.js';
import { useCart } from './components/context/CartContext.jsx';
import { useAuthStatus } from "./AuthWrapper.jsx";
import { toast } from 'react-toastify';
import ButtonComponent from './Button.jsx';
import CartComponent from './ButtonCart.jsx';
import './DynamicCard.css';

function DynamicCard() {
    const { _id, type } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { status } = useAuthStatus();
    const [quantity, setQuantity] = useState(5);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [showDescription, setShowDescription] = useState(true);
    const [showFeatures, setShowFeatures] = useState(false);
    const [reviewsList, setReviewsList] = useState([]);
    
    // RTK Query hooks - must be called before any conditional returns
    const { data: product, isLoading: isProductLoading } = useFetchProductByIdQuery({ type, _id });
    const { data: otherProductsRaw = [], isLoading: isOtherLoading } = useFetchOtherProductsQuery({type});

    useEffect(() => {
        // Fetch reviews for the product (for the always-visible list)
        async function fetchReviewsList() {
            try {
                const response = await axios.get(`http://localhost:3000/reviews/${_id}`);
                setReviewsList(response.data);
            } catch (error) {
                setReviewsList([]);
            }
        }
        if (_id) fetchReviewsList();
    }, [_id]);

    // Handle thumbnail click
    const handleThumbnailClick = (index) => {
        setSelectedImage(index);
    };

    // Handle carousel navigation
    const handleCarouselPrev = () => {
        if (!product) return;
        const productImages = [
            product.image,
            product.image2,
            product.image3
        ].filter(img => img); // Only include images that exist
        const newIndex = selectedImage === 0 ? productImages.length - 1 : selectedImage - 1;
        setSelectedImage(newIndex);
    };

    const handleCarouselNext = () => {
        if (!product) return;
        const productImages = [
            product.image,
            product.image2,
            product.image3
        ].filter(img => img); // Only include images that exist
        const newIndex = selectedImage === productImages.length - 1 ? 0 : selectedImage + 1;
        setSelectedImage(newIndex);
    };

    // Sync carousel with selected image when it changes
    useEffect(() => {
        // This effect will handle the carousel synchronization
        // The carousel will automatically update based on the selectedImage state
    }, [selectedImage]);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'description') {
            setShowDescription(true);
            setShowFeatures(false);
        } else if (tab === 'features') {
            setShowDescription(false);
            setShowFeatures(true);
        } else {
            setShowDescription(false);
            setShowFeatures(false);
        }
    };

    // Loading state
    if (isProductLoading || !product) {
        return (
            <>
                <Navbar />
                <div className="dynamic-card-container">
                    <div className="dynamic-card-loading">
                        Loading product...
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // Product images for thumbnail gallery
    const productImages = [
        product.image,
        product.image2,
        product.image3
    ].filter(img => img); // Only include images that exist

    // Thumbnail images - different views of the product
    const thumbnailImages = [
        product.image, // Main product view
        product.image2 || product.image, // Alternative view or fallback to main image
        product.image3 || product.image  // Usage view or fallback to main image
    ].filter(img => img);

    // Filter out the current product and add productType
    const otherProducts = otherProductsRaw
        .filter(p => p._id !== _id)
        .map(p => ({ ...p, productType: type }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    return (
        <>
            <Navbar />
            <div className="dynamic-card-container">
                {/* Hero Section */}
                <div className="dynamic-card-hero">
                    <div className="dynamic-card-content">
                        {/* Image Section */}
                        <div className="dynamic-card-image-section">
                            {/* Main Image Container */}
                            <div className="dynamic-card-main-image-container">
                                <div className="dynamic-card-carousel">
                                    <div className="carousel-container">
                                        <div className="carousel-inner">
                                            {productImages.map((img, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`carousel-item ${selectedImage === index ? 'active' : ''}`}
                                                    style={{
                                                        display: selectedImage === index ? 'block' : 'none'
                                                    }}
                                                >
                                                    <img src={img} className="carousel-image" alt={`Product ${index + 1}`} />
                                                </div>
                                            ))}
                                        </div>
                                        <button 
                                            className="carousel-control-prev" 
                                            type="button" 
                                            onClick={handleCarouselPrev}
                                        >
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button 
                                            className="carousel-control-next" 
                                            type="button" 
                                            onClick={handleCarouselNext}
                                        >
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail Gallery - Now below the carousel */}
                            <div className="dynamic-card-thumbnails">
                                {thumbnailImages.map((img, index) => (
                                    <div 
                                        key={index}
                                        className={`dynamic-card-thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => handleThumbnailClick(index)}
                                    >
                                        <img src={img} alt={`Product View ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="dynamic-card-info-section">
                            <h1 className="dynamic-card-title">{product.title}</h1>

                            {/* Price Section */}
                            <div className="dynamic-card-price-section" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <span className="dynamic-card-price" style={{ fontSize: '2rem', fontWeight: 700, color: '#333' }}>
                                    ₹{product.newprice}
                                </span>
                                {product.oldprice && (
                                    <span className="dynamic-card-old-price" style={{ fontSize: '1.2rem', color: '#888', textDecoration: 'line-through' }}>
                                        ₹{product.oldprice}
                                    </span>
                                )}
                            </div>

                            {/* Discount Element */}
                            {product.discount && (
                                <div className="dynamic-card-discount" style={{ color: '#fff', background: '#e53935', display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '1rem', marginBottom: '1.5rem' }}>
                                    {product.discount}% OFF
                                </div>
                            )}

                            {/* Quantity Selector and Add to Cart in one line */}
                            <div className="dynamic-card-quantity-cart-container">
                                <div className="dynamic-card-quantity">
                                    <div className="dynamic-card-quantity-selector">
                                        <button 
                                            className="dynamic-card-quantity-btn"
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <div className="dynamic-card-quantity-display">
                                            {quantity}
                                        </div>
                                        <button 
                                            className="dynamic-card-quantity-btn"
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    className="dynamic-card-add-to-cart"
                                    onClick={() => {
                                        addToCart({...product, quantity});
                                        toast.success('Item added to cart!');
                                    }}
                                >
                                    Add To Cart
                                </button>
                            </div>

                            {/* Action Buttons - Both buttons aligned */}
                            <div className="dynamic-card-buttons" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <button 
                                    className="dynamic-card-buy-now"
                                    onClick={() => {
                                        if (status === 'false') {
                                            navigate('/signup');
                                        } else {
                                            navigate('/delivery');
                                        }
                                    }}
                                    style={{ flex: 1 }}
                                >
                                    Buy It Now
                                </button>
                            </div>

                            {/* Engagement Options */}
                            <div className="dynamic-card-engagement">
                                <span className="dynamic-card-engagement-item">
                                    🔄 Compare
                                </span>
                                <span className="dynamic-card-engagement-item">
                                    ❓ Ask a Question
                                </span>
                                <span className="dynamic-card-engagement-item">
                                    📤 Social Share
                                </span>
                            </div>

                            {/* Payment Methods */}
                            <div className="dynamic-card-payment-section">
                                <div className="dynamic-card-payment-title">Guarantee safe & secure checkout</div>
                                <div className="dynamic-card-payment-methods">
                                    <div className="dynamic-card-payment-method">VISA</div>
                                    <div className="dynamic-card-payment-method">MC</div>
                                    <div className="dynamic-card-payment-method">AMEX</div>
                                    <div className="dynamic-card-payment-method">PP</div>
                                    <div className="dynamic-card-payment-method">AP</div>
                                    <div className="dynamic-card-payment-method">GP</div>
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="dynamic-card-delivery-info">
                                <div className="dynamic-card-delivery-item">
                                    <div className="dynamic-card-delivery-icon">🕒</div>
                                    <div className="dynamic-card-delivery-text">
                                        Estimated Delivery: <span className="dynamic-card-delivery-highlight">17 Oct, 2025 - 20 Oct, 2025</span>
                                    </div>
                                </div>
                                <div className="dynamic-card-delivery-item">
                                    <div className="dynamic-card-delivery-icon">🚚</div>
                                    <div className="dynamic-card-delivery-text">
                                        Free Shipping & Returns: <span className="dynamic-card-delivery-highlight">On all order over $200.00</span>
                                    </div>
                                </div>
                            </div>

                            {/* Product Metadata */}
                            <div className="dynamic-card-metadata">
                                <div className="dynamic-card-metadata-item">
                                    <span className="dynamic-card-metadata-label">SKU:</span>
                                    <span className="dynamic-card-metadata-value">Moor Single 3</span>
                                </div>
                                {/* <div className="dynamic-card-metadata-item">
                                    <span className="dynamic-card-metadata-label">Categories:</span>
                                    <span className="dynamic-card-metadata-value">Accessories, Headphones, Wireless Headset</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description and Reviews Tabs */}
                <div className="dynamic-card-tabs">
                    <div 
                        className={`dynamic-card-tab ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => handleTabClick('description')}
                    >
                        Description
                    </div>
                    <div 
                        className={`dynamic-card-tab ${activeTab === 'features' ? 'active' : ''}`}
                        onClick={() => handleTabClick('features')}
                    >
                        Features
                    </div>
                    <div 
                        className={`dynamic-card-tab ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => handleTabClick('reviews')}
                    >
                        Reviews (0)
                    </div>
                </div>

                {/* Description Content */}
                <div className={`dynamic-card-description-content ${showDescription ? 'show' : ''}`}>
                    <div className="dynamic-card-description-text">
                        <p>{product.description}</p>
                        {/* <p>Key features include:</p>
                        <ul>
                            <li>High-quality materials and construction</li>
                            <li>Advanced technology and innovation</li>
                            <li>Reliable performance and durability</li>
                            <li>User-friendly design and interface</li>
                            <li>Comprehensive warranty and support</li>
                        </ul> */}
                    </div>
                </div>

                {/* Features Content */}
                <div className={`dynamic-card-features-content ${showFeatures ? 'show' : ''}`}>
                    <div className="dynamic-card-features-text">
                        <h6>PRODUCT FEATURES:</h6>
                        <ul>
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
                    </div>
                </div>

                {/* Reviews Section (form and stats) */}
                {activeTab === 'reviews' && (
                    <div className="dynamic-card-reviews">
                        <Reviews productId={_id} />
                    </div>
                )}

                {/* Always show customer reviews list below tabs */}
                <div className="dynamic-card-reviews-list">
                    <h2 className="dynamic-card-reviews-title"> CustomerReviews</h2>
                    {reviewsList.length === 0 && <p>No reviews yet.</p>}
                    {reviewsList.map((review) => (
                        <div key={review._id} className="dynamic-card-review-item">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <div style={{ background: '#1976d2', color: '#fff', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20 }}>
                                    {review.name[0].toUpperCase()}
                                    console.log(`${review.name[0]}`)  
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{review.name} </div>

                                    <div style={{ fontSize: 12, color: '#888' }}>{new Date(review.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div style={{ color: '#ffb400', fontSize: 18, marginBottom: 4 }}>
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </div>
                            <div style={{ marginBottom: 8 }}>{review.comment}</div>
                        </div>
                    ))}
                </div>

                {/* Other Products Section */}
                <div className="dynamic-card-other-products">
                    <h1>Other Products</h1>
                    <div className="dynamic-card-other-products-grid">
                        {isOtherLoading ? (
                            <p>Loading other products...</p>
                        ) : (
                            otherProducts.map((prod) => (
                                <Cards key={prod._id} product={prod} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DynamicCard;