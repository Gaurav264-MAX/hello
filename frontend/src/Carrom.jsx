import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Chip, Rating } from "@mui/material";
import { useCart } from './components/context/CartContext';
import { toast } from 'react-toastify';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Carrom({ product }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleLearnMore = () => {
        navigate(`/${product.heading}/${product._id}`);
    };

    const handleAddToCart = () => {
        addToCart(product);
        toast.success('Added to cart!');
    };

    return (
        <Card sx={{ 
            width: '23%', 
            margin: '1%',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2), 0 0 30px rgba(255, 105, 180, 0.1)',
                border: '2px solid transparent',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ff69b4, #8a2be2, #667eea) border-box',
            }
        }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    sx={{ 
                        height: 160,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        }
                    }}
                    image={product.image}
                    title={product.title || product.name}
                    component="img"
                    style={{
                        objectFit: 'contain',
                        objectPosition: 'center'
                    }}
                />
                {/* Removed the "New" tag from top-right */}
            </Box>
            
            <CardContent sx={{ p: 1 }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 600,
                        color: '#2c3e50',
                        mb: 0.3,
                        lineHeight: 1.2,
                        height: '1.8em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        fontSize: '0.9rem'
                    }}
                >
                    {product.title || product.name}
                </Typography>
                
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: '#7f8c8d',
                        mb: 0.5,
                        lineHeight: 1.2,
                        height: '1.4em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        fontSize: '0.75rem'
                    }}
                >
                    {product.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                    <Rating 
                        value={4.5} 
                        precision={0.5} 
                        size="small"
                        sx={{ color: '#f39c12', fontSize: '0.8rem' }}
                        readOnly
                    />
                    <Typography variant="caption" sx={{ color: '#7f8c8d', fontSize: '0.7rem' }}>
                        (4.5)
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 700,
                            color: '#2c3e50',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '1rem'
                        }}
                    >
                        ₹{product.newprice}
                    </Typography>
                    {product.oldprice && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    textDecoration: 'line-through',
                                    color: '#95a5a6',
                                    fontWeight: 500,
                                    fontSize: '0.75rem'
                                }}
                            >
                                ₹{product.oldprice}
                            </Typography>
                            {product.discount && (
                                <Chip
                                    label={`${product.discount}% OFF`}
                                    size="small"
                                    sx={{
                                        backgroundColor: '#ff4757',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.6rem',
                                        height: '20px',
                                        '& .MuiChip-label': {
                                            padding: '0 6px'
                                        }
                                    }}
                                />
                            )}
                        </Box>
                    )}
                </Box>

                <Typography 
                    variant="caption" 
                    sx={{ 
                        color: '#27ae60',
                        fontWeight: 600,
                        display: 'block',
                        mb: 0.3,
                        fontSize: '0.7rem'
                    }}
                >
                    {product.delivery || 'Free Delivery'}
                </Typography>
            </CardContent>
            
            <CardActions sx={{ p: 1, pt: 0, gap: 0.5 }}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddToCart}
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 1.5,
                        py: 0.5,
                        fontSize: '0.75rem',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                        }
                    }}
                >
                    Add to Cart
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleLearnMore}
                    startIcon={<VisibilityIcon />}
                    sx={{
                        flex: 1,
                        borderColor: '#667eea',
                        color: '#667eea',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 1.5,
                        py: 0.5,
                        fontSize: '0.75rem',
                        '&:hover': {
                            borderColor: '#ff69b4',
                            color: '#ff69b4',
                            backgroundColor: 'rgba(255, 105, 180, 0.05)',
                            transform: 'translateY(-1px)'
                        }
                    }}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}

export default Carrom;