import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ResponsiveNavbar from './navbar.jsx' 
import CarouselComponent from "./CarouselComponent.jsx";
import Carrom from "./Card.jsx";
import StyledProductCard from "./StyledProductCard.jsx";
import Showmore from './Showmore.jsx';
import Heading from './heading.jsx';
import Footer from './footer.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './Home.css';
import RollingGallery from './Gallery';
import { MdLocalShipping, MdAutorenew, MdHeadsetMic } from "react-icons/md";
import { FaPiggyBank } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

import {useFetchAcPartsQuery,useFetchMachinesQuery,useFetchTvPartsQuery} from './apiroute.js';

import heroMouse from './assets/Image1.png'; // Use your gaming mouse image
import ac from './assets/ac.png';
import product2 from './assets/product2.png';
import product3 from './assets/product3.png';
import split from './assets/split.png';
import tv from './assets/tv.png';
import washing from './assets/washing.png';
const heroImages = [ac, product2, product3];

const heroTexts = [
  {
    title: "Elevate Your Experience\nWith Top-Tier Gaming Gear",
    desc: "Discover the Cutting-Edge Gear That Will Revolutionize Your Gaming Journey"
  },
  {
    title: "Unleash Power\nWith Our Next-Gen Product",
    desc: "Experience performance and reliability like never before."
  },
  {
    title: "Innovation Meets Style",
    desc: "Upgrade your setup with the latest in tech and design."
  }
];

// Review data
const reviews = [
  {
    id: 1,
    name: "Timothy A. Thompson",
    location: "From California",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face&sat=-50&contrast=20",
    testimonial: "As a content creator, having high-quality audio is critical. The headphones deliver incredible sound quality and noise cancellation that makes my streams. Highly recommended for any serious gamer!"
  },
  {
    id: 2,
    name: "Sarah M. Johnson",
    location: "From New York",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face&sat=-50&contrast=20",
    testimonial: "The gaming experience has been completely transformed! The audio quality is crystal clear and the comfort level is amazing for long gaming sessions. Best investment I've made!"
  },
  {
    id: 3,
    name: "Michael R. Davis",
    location: "From Texas",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face&sat=-50&contrast=20",
    testimonial: "As someone who travels a lot, I love how portable and durable the headphones are. The battery life is incredible, and the sound profile is perfectly tuned for gaming. I take it with me everywhere."
  },
  {
    id: 4,
    name: "Joseph S. Thomas",
    location: "From California",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face&sat=-50&contrast=20",
    testimonial: "The build quality is exceptional and the sound isolation is perfect for competitive gaming. My teammates can hear me clearly and I can focus on the game without distractions."
  },
  {
    id: 5,
    name: "Emily L. Wilson",
    location: "From Florida",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face&sat=-50&contrast=20",
    testimonial: "The RGB lighting effects are stunning and the audio quality is top-notch. Perfect for both gaming and music. The microphone quality is also excellent for streaming!"
  }
];

const Home = () => {
    const navigate = useNavigate();
    const { data: machines = [], isLoading: isMachinesLoading } = useFetchMachinesQuery();
    const { data: acParts = [], isLoading: isAcLoading } = useFetchAcPartsQuery();
    const { data: tvParts = [], isLoading: isTvLoading } = useFetchTvPartsQuery();

    const machinesWithType = machines.map(machine => ({
        ...machine,
        productType: 'machine'
    }));
    const acPartsWithType = acParts.map(ac => ({
        ...ac,
        productType: 'ac'
    }));
    const tvPartsWithType = tvParts.map(tv => ({
        ...tv,
        productType: 'tv'
    }));

    const [currentImage, setCurrentImage] = useState(0);
    const [animClass, setAnimClass] = useState('bounce-in');
    const [textAnimClass, setTextAnimClass] = useState('fade-in');
    const [selectedReview, setSelectedReview] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        // Start entrance animation
        setAnimClass('bounce-in');
        setTextAnimClass('fade-in');
        // After 5s, trigger exit animation, then swap image
        const exitTimeout = setTimeout(() => {
            setAnimClass('slide-out');
            setTextAnimClass('fade-out');
            // After exit animation, show next image and bounce in
            setTimeout(() => {
                setCurrentImage((prev) => (prev + 1) % heroImages.length);
                setAnimClass('bounce-in');
                setTextAnimClass('fade-in');
            }, 600); // match slide-out animation duration
        }, 5000);
        return () => clearTimeout(exitTimeout);
    }, [currentImage]);

    useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    },
    { threshold: 0.3 }
  );

  const storySection = document.querySelector('.story-section');
  const categoriesSection = document.querySelector('.categories-section');
  
  if (storySection) {
    observer.observe(storySection);
  }
  
  if (categoriesSection) {
    observer.observe(categoriesSection);
  }

  return () => observer.disconnect();
}, []);

    // Add scroll animations for product sections
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-animate');
                        
                        // Animate product cards with staggered delay
                        const productCards = entry.target.querySelectorAll('.styled-product-card');
                        productCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('card-animate');
                            }, index * 150); // 150ms delay between each card
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        const productSections = document.querySelectorAll('.machine, .ac, .tv, .brands-section, .reviews-section');
        productSections.forEach(section => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const handleReviewClick = (reviewId) => {
        setSelectedReview(selectedReview === reviewId ? null : reviewId);
    };



    return(
        <>
            <ResponsiveNavbar />
            <div className="hero-navbar-wrapper">
                <div className="hero-navbar-glow"></div>
                <section className="hero-section">
                    <div className={`hero-content ${textAnimClass}`}>
                        <h1>
                            {heroTexts[currentImage].title.split('\n').map((line, idx) => (
                                <React.Fragment key={idx}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </h1>
                        <p>{heroTexts[currentImage].desc}</p>
                        <a href="#shop" className="hero-btn">Purchase Now &rarr;</a>
                    </div>
                    <div className="product-float-image">
                        <img
                            src={heroImages[currentImage]}
                            alt="Product"
                            className={`${animClass} ${currentImage === 1 || currentImage === 2 ? 'product-float-image-small' : ''}`}
                            key={currentImage} // force re-mount for animation
                        />
                    </div>
                </section>
            </div>
            
            <div className="feature-badges">
              <div className="feature-badge">
                <div className="feature-icon-glow">
                  <MdLocalShipping size={48} color="#e754e7" />
                </div>
                <div>
                  <div className="feature-title">Free Shipping</div>
                  <div className="feature-desc">Free Shipping to Make<br/>Your Shopping Experience Seamless.</div>
                </div>
              </div>
              <div className="feature-badge">
                <div className="feature-icon-glow">
                  <MdAutorenew size={48} color="#e754e7" />
                </div>
                <div>
                  <div className="feature-title">Return Policy</div>
                  <div className="feature-desc">Flexible Returns to Ensure a<br/>Positive Shopping Experience.</div>
                </div>
              </div>
              <div className="feature-badge">
                <div className="feature-icon-glow">
                  <FaPiggyBank size={48} color="#e754e7" />
                </div>
                <div>
                  <div className="feature-title">Save Money</div>
                  <div className="feature-desc">Shop Smarter and Save Big<br/>with Our Money-Saving Solutions.</div>
                </div>
              </div>
              <div className="feature-badge">
                <div className="feature-icon-glow">
                  <MdHeadsetMic size={48} color="#e754e7" />
                </div>
                <div>
                  <div className="feature-title">Support 24/7</div>
                  <div className="feature-desc">Unparalleled Support,<br/>Tailored to Your Needs 24 Hours a Day.</div>
                </div>
              </div>
            </div>
            
            <div className="story-section">
              <div className="story-video-card">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                    title="Our Story Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-video"
                  ></iframe>
                </div>
              </div>
              
              <div className="story-text-card">
                <div className="story-content">
                  <h2>Our Story</h2>
                  <p>
                    Driven by gaming passion, we craft the finest gear to empower players. 
                    Our unwavering innovation and user focus make us an integral part of the 
                    global gaming community.
                  </p>
                  <a href="#about" className="read-more-btn">
                    Read More →
                  </a>
                </div>
              </div>
            </div>
            
            <div className="categories-section">
              <h2 className="categories-title">CATEGORIES</h2>
              <div className="categories-grid">
                <div className="category-card" onClick={() => navigate('/ac')}>
                  <div className="category-image">
                    <img src={split} alt="AC Parts" />
                  </div>
                  <div className="category-content">
                    <h3>AC Parts</h3>
                    <button className="shop-now-btn" onClick={(e) => { e.stopPropagation(); navigate('/ac'); }}>Shop Now →</button>
                  </div>
                </div>
                
                <div className="category-card" onClick={() => navigate('/washingmachine')}>
                  <div className="category-image">
                    <img src={washing} alt="Washing Machine Parts" />
                  </div>
                  <div className="category-content">
                    <h3>Washing Machine</h3>
                    <button className="shop-now-btn" onClick={(e) => { e.stopPropagation(); navigate('/washingmachine'); }}>Shop Now →</button>
                  </div>
                </div>
                
                <div className="category-card" onClick={() => navigate('/tv')}>
                  <div className="category-image">
                    <img src={tv} alt="TV Parts" />
                  </div>
                  <div className="category-content">
                    <h3>TV Parts</h3>
                    <button className="shop-now-btn" onClick={(e) => { e.stopPropagation(); navigate('/tv'); }}>Shop Now →</button>
                  </div>
                </div>
              </div>
            </div>
            
            <br></br>
            {/* <CarouselComponent /> */}
            <br></br>
            <br></br>
           <div className="machine" id="first-category" style={{backgroundColor: 'transparent'}}>
                <Heading head={<span style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '2.6rem',
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '0.08em',
                  fontFamily: 'Orbitron, Poppins, Arial, sans-serif',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #fff 60%, #e754e7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 8px #e754e755)',
                  marginBottom: '2.5rem',
                  marginTop: '1.5rem',
                }}>Top Rated Washing Machine Spare Parts</span>} noUnderline={true}/>
                <div style={{height: '0.5rem'}}></div>
                <div style={{display:"flex",justifyContent:"center", gap: "3.5rem", flexWrap: "wrap", marginTop: '0.5rem'}}>
                    {isMachinesLoading ? (
                        <p style={{color: '#fff'}}>Loading...</p>
                    ) : machinesWithType.length > 0 ? (
                        machinesWithType.slice(0, 4).map((product) => (
                            <StyledProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <p style={{color: '#fff'}}>No machines available</p>
                    )}
                    
                </div>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
  <Showmore route="/washingmachine" />
</div>
                {/* <Showmore route="/washingmachine"/> */}
            </div>
            <div className='ac'>
                <Heading head={<span style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '2.6rem',
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '0.08em',
                  fontFamily: 'Orbitron, Poppins, Arial, sans-serif',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #fff 60%, #e754e7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 8px #e754e755)',
                  marginBottom: '2.5rem',
                  marginTop: '1.5rem',
                }}>Ac Spare Parts</span>} noUnderline={true}/>
                <div style={{height: '0.5rem'}}></div>
                <div style={{display:"flex",justifyContent:"center", gap: "3.5rem", flexWrap: "wrap", marginTop: '0.5rem'}}>
                    {isAcLoading ? (
                        <p style={{color: '#fff'}}>Loading...</p>
                    ) : acPartsWithType.length > 0 ? (
                        acPartsWithType.slice(0, 4).map((product) => (
                            <StyledProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <p style={{color: '#fff'}}>No ac available</p>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
  <Showmore route="/ac" />
</div>
            </div>
            <div className='tv' >
                <br style={{ marginBottom: 0 }}></br>
                <Heading head={<span style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '2.6rem',
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '0.08em',
                  fontFamily: 'Orbitron, Poppins, Arial, sans-serif',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #fff 60%, #e754e7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 8px #e754e755)',
                  marginBottom: '2.5rem',
                  marginTop: '1.5rem',
                }}>Tv Spare Parts</span>} noUnderline={true}/>
                <div style={{height: '0.5rem'}}></div>
                <div style={{display:"flex",justifyContent:"center", gap: "3.5rem", flexWrap: "wrap", marginTop: '0.5rem'}}>
                    {isTvLoading ? (
                        <p style={{color: '#fff'}}>Loading...</p>
                    ) : tvPartsWithType.length > 0 ? (
                        tvPartsWithType.slice(0, 4).map((product) => (
                            <StyledProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <p style={{color: '#fff'}}>No tv available</p>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
  <Showmore route="/tv" />
</div>
            </div>

            {/* Shop by Popular Brands Section */}
            <div className="brands-section">
              <h2 className="brands-title">SHOP BY<br/>POPULAR BRANDS</h2>
              <div className="brands-grid">
                {/* Row 1 */}
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">LG</div>
                  </div>
                  <div className="brand-content">
                    <h3>LG</h3>
                    <p>Electronics & Appliances</p>
                  </div>
                </div>
                
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">SAMSUNG</div>
                  </div>
                  <div className="brand-content">
                    <h3>Samsung</h3>
                    <p>Smart Home Solutions</p>
                  </div>
                </div>
                
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">WHIRLPOOL</div>
                  </div>
                  <div className="brand-content">
                    <h3>Whirlpool</h3>
                    <p>Kitchen & Laundry</p>
                  </div>
                </div>
                
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">HAIER</div>
                  </div>
                  <div className="brand-content">
                    <h3>Haier</h3>
                    <p>Home Appliances</p>
                  </div>
                </div>
                
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">VOLTAS</div>
                  </div>
                  <div className="brand-content">
                    <h3>Voltas</h3>
                    <p>AC & Cooling</p>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">GODREJ</div>
                  </div>
                  <div className="brand-content">
                    <h3>Godrej</h3>
                    <p>Appliances & More</p>
                  </div>
                </div>
                
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">BLUE STAR</div>
                  </div>
                  <div className="brand-content">
                    <h3>Blue Star</h3>
                    <p>Air Conditioning</p>
                  </div>
                </div>
                
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">IFB</div>
                  </div>
                  <div className="brand-content">
                    <h3>IFB</h3>
                    <p>Washing Machines</p>
                  </div>
                </div>
                
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">BOSCH</div>
                  </div>
                  <div className="brand-content">
                    <h3>Bosch</h3>
                    <p>Premium Appliances</p>
                  </div>
                </div>
                
                <div className="brand-card">
                  <div className="brand-icon">
                    <div className="brand-logo-text">PANASONIC</div>
                  </div>
                  <div className="brand-content">
                    <h3>Panasonic</h3>
                    <p>Electronics & Home</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="reviews-section">
              <h2 className="reviews-title">CUSTOMER<br/>REVIEWS</h2>
              
              <div className="reviews-container">
                <div className="reviews-scroll-container">
                  {reviews.slice(0, 5).map((review) => (
                    <motion.div
                      key={review.id}
                      className={`review-card ${selectedReview === review.id ? 'expanded' : ''}`}
                      onClick={() => handleReviewClick(review.id)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <div className="review-image">
                        <img src={review.image} alt={review.name} />
                        
                        <AnimatePresence>
                          {selectedReview === review.id && (
                            <motion.div
                              className="review-gradient-overlay"
                              initial={{ opacity: 0, y: 100, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 100, scale: 0.8 }}
                              transition={{ 
                                duration: 0.5, 
                                ease: "easeOut",
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                              }}
                            >
                              <div className="review-content">
                                <motion.h3
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2, duration: 0.3 }}
                                >
                                  {review.name}
                                </motion.h3>
                                <motion.p 
                                  className="review-location"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3, duration: 0.3 }}
                                >
                                  {review.location}
                                </motion.p>
                                <motion.p 
                                  className="review-text"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4, duration: 0.3 }}
                                >
                                  "{review.testimonial}"
                                </motion.p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* <RollingGallery autoplay={true} pauseOnHover={true} /> */}
            <Footer />
           
        </>
    )
}

export default Home;