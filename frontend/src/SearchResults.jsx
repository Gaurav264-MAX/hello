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
  Link
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchProductsQuery } from './apiroute.js';
function SearchResults() {
  // const [results, setResults] = useState([]);
  // const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';

  // useEffect(() => {
  //   const fetchSearchResults = async () => {
  //     setLoading(true);
  //     try {
  //       // Function to safely fetch data with error handling
  //       const safeSearch = async (endpoint, category) => {
  //         try {
  //           const response = await axios.get(
  //             `http://localhost:3000/api/${endpoint}-search?q=${encodeURIComponent(query)}`
  //           );
  //           return response.data.map(item => ({ ...item, category }));
  //         } catch (error) {
  //           console.error(`${category} search error:`, error);
  //           return [];
  //         }
  //       };
const{ data: machineResults = [],isLoading: isLoadingMachine } = useSearchProductsQuery({ endpoint: 'machine', query },{skip: !query});
const{ data: acResults = [],isLoading: isLoadingAc } = useSearchProductsQuery({ endpoint: 'ac', query },{skip: !query});
const{ data: tvResults = [],isLoading: isLoadingTv } = useSearchProductsQuery({ endpoint: 'tv', query },{skip: !query});
const results=[...machineResults, ...acResults, ...tvResults];
const isLoading = isLoadingMachine || isLoadingAc || isLoadingTv;
        // Fetch from all product categories
        // const [machineResults, acResults, tvResults] = await Promise.all([
        //   safeSearch('machine', 'machine'),
        //   safeSearch('ac', 'ac'),
        //   safeSearch('tv', 'tv')
        // ]);
        
  //       // Combine all results
  //       const combinedResults = [
  //         ...machineResults,
  //         ...acResults,
  //         ...tvResults
  //       ];
        
  //       setResults(combinedResults);
  //     } catch (error) {
  //       console.error('Search error:', error);
  //       setResults([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (query) {
  //     fetchSearchResults();
  //   } else {
  //     setResults([]);
  //     setLoading(false);
  //   }
  // }, [query]);

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

  return (
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
        <Grid container spacing={3}>
          {results.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${product.category}-${product._id}`}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 3,
                    cursor: 'pointer'
                  }
                }}
                onClick={() => handleProductClick(product)}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.title}
                  sx={{ objectFit: 'contain', pt: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category.toUpperCase()}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="h6" color="primary">
                      ₹{product.newprice}
                    </Typography>
                    {product.oldprice && (
                      <Typography 
                        variant="body2" 
                        sx={{ textDecoration: 'line-through', alignSelf: 'center' }}
                      >
                        ₹{product.oldprice}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="h6">No results found for "{query}"</Typography>
          <Typography variant="body2" mt={2}>
            Please try a different search term or browse our categories.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default SearchResults; 