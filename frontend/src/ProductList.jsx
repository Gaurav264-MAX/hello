import React from "react";
import { FaStar } from "react-icons/fa";
import "./ProductList.css"; // Import CSS file
import Image1 from "./assets/Image1.png";
import Image2 from "./assets/Image2.png";

// Define product data with actual images
const products = [
  {
    id: 1,
    image: Image1, // Use imported image variable
    title: "Monitor AC Stand/Heavy Duty Air Conditioner Outdoor Unit Mounting Bracket",
    rating: 4.1,
    reviews: "4.8K",
    price: 799,
    originalPrice: 1890,
    discount: "58% off",
    deliveryDate: "Thu, 3 Apr",
    fastestDelivery: "Fri, 28 Mar",
    bestSeller: true,
  },
  {
    id: 2,
    image: Image2, // Use imported image variable
    title: "SIROTIA 24 Inch AC Stand Heavy Duty Air Conditioner Outdoor Unit Mounting Brackets",
    rating: 4.0,
    reviews: 3,
    price: 691,
    originalPrice: 2990,
    discount: "77% off",
    deliveryDate: "Sun, 30 Mar",
    fastestDelivery: null,
    bestSeller: false,
  },
];

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Product Image on Left */}
      <img src={product.image} alt="Product" className="product-image" />

      {/* Product Details on Right */}
      <div className="product-details">
        {/* Best Seller Tag */}
        {product.bestSeller && <span className="best-seller">Best Seller</span>}

        {/* Product Title */}
        <h2 className="product-title">{product.title}</h2>

        {/* Rating and Reviews */}
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.round(product.rating) ? "star-filled" : "star-empty"} />
          ))}
          <span>{product.rating} ({product.reviews})</span>
        </div>

        {/* Pricing and Discount */}
        <p className="product-price">
          ₹{product.price} <span className="original-price">₹{product.originalPrice}</span> <span className="discount">({product.discount})</span>
        </p>

        {/* Delivery Information */}
        <p className="product-delivery">FREE delivery <strong>{product.deliveryDate}</strong></p>
        {product.fastestDelivery && <p className="fastest-delivery">Or fastest delivery <strong>{product.fastestDelivery}</strong></p>}

        {/* Add to Cart Button */}
        <button className="add-to-cart">Add to cart</button>
      </div>
    </div>
  );
};

const ProductList = () => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
