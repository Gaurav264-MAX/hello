
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
  Grid,
  MenuItem
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Delivery = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    pincode: '',
    address: '',
    paymentMethod: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save delivery details to localStorage for profile prefill
      localStorage.setItem('lastDeliveryDetails', JSON.stringify(formData));
      // First save delivery details
      const deliveryResponse = await fetch('http://localhost:3000/delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!deliveryResponse.ok) {
        throw new Error('Failed to save delivery details');
      }

      const deliveryData = await deliveryResponse.json();

      // Get cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      const totalAmount = parseFloat(localStorage.getItem('cartTotal'));

      if (!cartItems || !totalAmount) {
        throw new Error('Cart data not found');
      }

      // Format items to match the Order model schema
      const formattedItems = cartItems.map(item => ({
        productId: item._id,
        name: item.title,
        quantity: item.quantity,
        price: item.newprice,
        image: item.image,
        title: item.title,
        newprice: item.newprice,
        heading: item.heading
      }));

      // Create order with formatted items
      const orderResponse = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId') || 'guest',
          deliveryDetails: deliveryData._id,
          items: formattedItems,
          totalAmount: totalAmount
        })
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      // Clear cart data from localStorage
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotal');

      setSnackbar({
        open: true,
        message: 'Order placed successfully!',
        severity: 'success'
      });

      // Navigate to order confirmation after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Error processing order. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        my: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            borderRadius: 2,
            backgroundColor: '#ffffff'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4,
            gap: 2
          }}>
            <LocalShippingIcon 
              sx={{ 
                fontSize: 40, 
                color: 'primary.main'
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 600,
                color: '#2c3e50'
              }}
            >
              Delivery Details
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 1.5 },
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  inputProps={{ maxLength: 10 }}
                  helperText="Enter 10 digit mobile number"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="PIN Code"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 1.5 },
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  inputProps={{ maxLength: 6 }}
                  helperText="Enter 6 digit PIN code"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Delivery Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={3}
                  InputProps={{
                    sx: { borderRadius: 1.5 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Payment Method"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: 1.5 } }}
                >
                  <MenuItem value="">Select Payment Method</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Debit Card">Debit Card</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Net Banking">Net Banking</MenuItem>
                  <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 2
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Delivery;