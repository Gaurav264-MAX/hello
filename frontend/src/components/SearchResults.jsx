import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Box,
  CircularProgress,
  Divider,
  Breadcrumbs,
  Link,
  Paper,
  Button,
  Rating,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ResponsiveNavbar from '../navbar';
import { useCart } from './context/CartContext';
import { toast } from 'react-toastify';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Function to safely fetch data with error handling
        const safeSearch = async (endpoint, category) => {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/${endpoint}-search?q=${encodeURIComponent(query)}`
            );
            return response.data.map(item => ({ ...item, category }));
          } catch (error) {
            console.error(`${category} search error:`, error);
            return [];
          }
        };

        // Fetch from all product categories
        const [machineResults, acResults, tvResults] = await Promise.all([
          safeSearch('machine', 'machine'),
          safeSearch('ac', 'ac'),
          safeSearch('tv', 'tv')
        ]);
        
        // Combine all results
        const combinedResults = [
          ...machineResults,
          ...acResults,
          ...tvResults
        ];
        
        setResults(combinedResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  const handleProductClick = (product) => {
    let route;
    
    // Map the categories to their correct route paths
    switch (product.category) {
      case 'machine':
        route = 'machine';
        break;
      case 'tv':
        route = 'tv';
        break;
      case 'ac':
        route = 'ac';
        break;
      default:
        route = product.category;
    }
    
    navigate(`/${route}/${product._id}`);
  };

  // Add to cart handler
  const handleAddToCart = (product, event) => {
    event.stopPropagation(); // Prevent triggering the card click
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <>
      <ResponsiveNavbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4}>
          <Breadcrumbs>
            <Link underline="hover" color="inherit" onClick={() => navigate('/')}>
              Home
            </Link>
            <Typography color="text.primary">Search Results</Typography>
          </Breadcrumbs>
          <Typography variant="h4" component="h1" mt={2} display="flex" alignItems="center">
            <SearchIcon sx={{ mr: 1 }} /> 
            Search Results for "{query}"
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {results.length} results found
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {loading ? (
          <Box display="flex" justifyContent="center" my={8}>
            <CircularProgress />
          </Box>
        ) : results.length > 0 ? (
          <Box>
            {results.map((product) => (
              <Paper
                key={`${product.category}-${product._id}`}
                elevation={1}
                sx={{ 
                  mb: 3, 
                  p: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                    cursor: 'pointer'
                  }
                }}
                onClick={() => handleProductClick(product)}
              >
                <Grid container spacing={3}>
                  {/* Product Image */}
                  <Grid item xs={12} sm={3} md={2}>
                    <Box
                      sx={{
                        height: 160,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        p: 1
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                  </Grid>

                  {/* Product Details */}
                  <Grid item xs={12} sm={9} md={7}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{ 
                          fontWeight: 500, 
                          mb: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {product.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={4} readOnly size="small" />
                        <Chip 
                          size="small" 
                          label={product.category.toUpperCase()} 
                          sx={{ ml: 2, bgcolor: '#e3f2fd', color: '#1976d2' }} 
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description ? 
                          (product.description.length > 180 ? 
                            product.description.substring(0, 180) + '...' : 
                            product.description) : 
                          'High quality product with excellent features and performance.'}
                      </Typography>
                      
                      {product.feature && product.feature.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Key Features:
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {Array.isArray(product.feature) 
                              ? product.feature.slice(0, 3).join(', ') 
                              : product.feature.substring(0, 100)}
                          </Typography>
                        </Box>
                      )}
                      
                      <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
                        <LocalShippingIcon sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" color="success.main">
                          {product.delivery || 'Free Delivery'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Price and Action Section */}
                  <Grid item xs={12} sm={12} md={3}>
                    <Box 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: { xs: 'flex-start', md: 'flex-end' },
                        p: 2
                      }}
                    >
                      <Box sx={{ mb: 2, textAlign: { xs: 'left', md: 'right' } }}>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                          ₹{product.newprice.toLocaleString()}
                        </Typography>
                        
                        {product.oldprice && (
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                              ₹{product.oldprice.toLocaleString()}
                            </Typography>
                            
                            {product.discount && (
                              <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                                {product.discount}% off
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>
                      
                      <Button 
                        variant="contained" 
                        startIcon={<ShoppingCartIcon />}
                        size="small"
                        sx={{ 
                          borderRadius: 2,
                          textTransform: 'none',
                          mb: 1,
                          width: { xs: '100%', sm: 'auto' }
                        }}
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        ) : (
          <Box textAlign="center" py={8}>
            <Typography variant="h6">No results found for "{query}"</Typography>
            <Typography variant="body2" mt={2}>
              Please try a different search term or browse our categories.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default SearchResults; 