import React from 'react';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import Cards from './Card.jsx';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductPage from './Carousel.jsx';
import ReviewForm from './ReviewForm.jsx';
import Reviews from './Reviews.jsx';
import { Divider } from '@mui/material';

function ClickCard({product}) {
    const images = [
        "/static/images/cards/image1.jpg",
        "/static/images/cards/image2.jpg",
        "/static/images/cards/image3.jpg"
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <>
            <Navbar />
            <h1 className="my-3 mx-1">Product Name</h1>
            <h3 className="my-3 mx-1">Brand Name</h3>
            <ProductPage product={product} />
           
            <Divider sx={{ my: 4 }} />
            
            {/* Reviews Section */}
            <Reviews productId={product._id} />
            <ReviewForm productId={product._id} />

            <Divider sx={{ my: 4 }} />

            <h1>Other Products</h1>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <Cards />
                <Cards />
                <Cards />
                <Cards />
            </div>
            <br></br>
            <br></br>

            <Footer />
        </>
    )
}

export default ClickCard;