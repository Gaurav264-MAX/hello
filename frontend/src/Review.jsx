import React from 'react'
import Image1 from "./assets/Image1.png";
import Image2 from "./assets/Image2.png";
import Image3 from "./assets/Image3.png";
// RatingSummary Component
const RatingSummary = () => {
  const ratings = {
    5: 50,
    4: 28,
    3: 11,
    2: 4,
    1: 7,
  };

  const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);
  const averageRating = 4.1; // Example Value

  return (
    <div>
      <h2>Customer reviews</h2>
      <div>{'*'.repeat(Math.floor(averageRating))} {averageRating} out of 5</div>
      <div>{totalRatings} global ratings</div>
      {Object.entries(ratings).map(([star, percentage]) => (
        <div key={star}>
          <span>{star} star</span>
          <div style={{ width: '100%', background: '#f0f0f0', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${percentage}%`, background: '#ff9f00', height: '10px' }} />
          </div>
          <span> {percentage}%</span>
        </div>
      ))}
      <a href="#">How are ratings calculated?</a>
    </div>
  );
};

// CustomerFeedback Component
const CustomerFeedback = () => {
  const feedbackText = "Customers find the speaker amplifier stand to have a good build quality, functionality, and value for money. They appreciate its weight...";
  const features = [
    "Quality", "Functionality", "Value for money", 
    "Weight", "Ac stand", "Fit", 
    "Bolts and screws", "Paint quality"
  ];

  return (
    <div>
      <h3>Customers say</h3>
      <p>{feedbackText}</p>
      <div>
        {features.map((feature, index) => (
          <span key={index} style={{ marginRight: '10px' }}>
            {feature.includes("Bolts") || feature.includes("Paint") ? 
              <span style={{ color: 'red' }}>❌ {feature}</span> :
              <span style={{ color: 'green' }}>✔️ {feature}</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

// ReviewImages Component
const ReviewImages = () => {
  const images = [
    Image1, Image2, Image3, 
    Image1, Image2
  ];

  return (
    <div>
      <h3>Reviews with images</h3>
      <div style={{ display: 'flex', overflowX: 'scroll' }}>
        {images.map((img, index) => (
          <img key={index} src={img} alt="Review" style={{ width: '150px', margin: '5px' }} />
        ))}
      </div>
      <a href="#">See all photos</a>
    </div>
  );
};

// Main Component
const ProductReviews = () => {
  return (
    <div style={{ margin: '20px' }}>
      <RatingSummary />
      <CustomerFeedback />
      <ReviewImages />
    </div>
  );
};

export default ProductReviews;