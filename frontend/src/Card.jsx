import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from './components/context/CartContext';
import { toast } from 'react-toastify';
import { useAuthStatus } from "./AuthWrapper.jsx";

function Cards({product}) {
    const { _id, title, description, image, newprice, productType } = product || {};
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { status } = useAuthStatus();

    const handleBuyNow = () => {
        addToCart(product);
        toast.success('Added to cart!');
        if (status === 'false') {
            navigate('/signup');
        } else {
            navigate('/delivery');
        }
    };

    const handleLearnMore = () => {
        // Use the correct route based on product type
        const route = productType === 'machine' ? 'washingmachine' : productType;
        window.scrollTo(0, 0);
        navigate(`/${route}/${_id}`);
    };

    return (
        <Card sx={{ 
            maxWidth: 345, 
            m: 2,
            borderRadius: 3,
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            '&:hover': {
                transform: 'translateY(-8px)',
                border: '2px solid transparent',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff69b4, #8a2be2, #ff69b4) border-box',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 105, 180, 0.4), 0 0 60px rgba(138, 43, 226, 0.2)',
                animation: 'glowPulse 2s ease-in-out infinite alternate'
            }
        }}>
            <CardMedia
                sx={{ 
                    height: 140,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)'
                    }
                }}
                image={image || "https://example.com/default-image.jpg"}
                title={title || "Product"}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title || "Product Title"}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description || "Description not available."}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                    Price: ₹{newprice}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    size="small" 
                    onClick={handleBuyNow}
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                        }
                    }}
                >
                    Buy Now
                </Button>
                <Button 
                    onClick={handleLearnMore} 
                    size="small"
                    sx={{
                        border: '2px solid #667eea',
                        color: '#667eea',
                        '&:hover': {
                            background: '#667eea',
                            color: 'white',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default Cards;