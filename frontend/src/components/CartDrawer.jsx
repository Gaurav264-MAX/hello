import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
  Badge,
  Snackbar,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from './context/CartContext.jsx';
import { useAuthStatus } from '../AuthWrapper.jsx'; // ✅ Valid path

// Add CSS keyframes for neon border animation
const neonBorderStyles = `
  @keyframes neonBorder {
    0% {
      background-position: 0% 0%;
    }
    25% {
      background-position: 100% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

const CartDrawer = ({ open, onClose }) => {
  const { status } = useAuthStatus(); // ✅ Correct placement
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Inject neon border styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = neonBorderStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.newprice * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('cartTotal', calculateTotal().toString());
      onClose();

      // ✅ Check login status
      if (status === 'true') {
        navigate('/delivery');
      } else {
        navigate('/signup');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setSnackbar({
        open: true,
        message: 'Error processing checkout. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            padding: { xs: 1.5, sm: 2 },
            backgroundColor: '#ffffff',
            borderLeft: '1px solid #f0f0f0'
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              pb: 1.5,
              borderBottom: '2px solid #f0f0f0',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              p: 2,
              mx: 1,
              mt: 1,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-3px',
                left: '-3px',
                right: '-3px',
                bottom: '-3px',
                borderRadius: 'inherit',
                background: 'linear-gradient(90deg, transparent 0%, #ff69b4 25%, #ff1493 50%, #ff69b4 75%, transparent 100%)',
                backgroundSize: '400% 100%',
                animation: 'neonBorder 4s linear infinite',
                zIndex: -1,
                filter: 'blur(0.5px)',
                boxShadow: '0 0 10px rgba(255, 105, 180, 0.5)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingCartIcon sx={{ fontSize: 26, color: 'white' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Shopping Cart
              </Typography>
              {/* <Badge 
                badgeContent={cartItems.length} 
                sx={{ 
                  ml: 1,
                  '& .MuiBadge-badge': {
                    backgroundColor: '#ff69b4',
                    color: 'white',
                    fontWeight: 600
                  }
                }} 
              /> */}
            </Box>
            {/* <IconButton
              onClick={onClose}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white'
                }
              }}
            >
              <CloseIcon />
            </IconButton> */}
          </Box>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                color: 'text.secondary',
                backgroundColor: '#f8f9fa',
                borderRadius: 3,
                p: 4,
                mx: 1
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 48, opacity: 0.5, color: '#667eea' }} />
              <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
                Your cart is empty
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={onClose}
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#667eea',
                    color: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.05)'
                  }
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <List sx={{ flex: 1, overflow: 'auto', px: 0 }}>
              {cartItems.map((item, index) => (
                <ListItem
                  key={item._id}
                  sx={{
                    mb: 1.5,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    p: 1.5,
                    position: 'relative',
                    border: '1px solid #f0f0f0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                      borderColor: '#667eea'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image || item.image2 || item.image3 || "https://via.placeholder.com/70x70?text=No+Image"}
                      alt={item.name || item.title || "Product"}
                      sx={{
                        width: 70,
                        height: 70,
                        objectFit: 'cover',
                        borderRadius: 1.5,
                        flexShrink: 0,
                        border: '1px solid #f0f0f0'
                      }}
                    />

                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: '#333',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.title || item.name || "Product"}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        sx={{ 
                          fontWeight: 600,
                          color: '#667eea'
                        }}
                      >
                        {item.quantity} × ₹{item.newprice}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 1,
                        minWidth: 100,
                        flexShrink: 0
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: '#f8f9fa',
                          borderRadius: 1,
                          border: '1px solid #e0e0e0'
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item._id, Math.max(1, item.quantity - 1))
                          }
                          disabled={item.quantity <= 1}
                          sx={{
                            p: 0.5,
                            color: '#666',
                            '&:hover': { 
                              bgcolor: 'rgba(102, 126, 234, 0.1)',
                              color: '#667eea'
                            },
                            '&.Mui-disabled': {
                              color: '#ccc'
                            }
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{
                            px: 1,
                            fontWeight: 600,
                            color: '#333'
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          sx={{
                            p: 0.5,
                            color: '#666',
                            '&:hover': { 
                              bgcolor: 'rgba(102, 126, 234, 0.1)',
                              color: '#667eea'
                            }
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <IconButton
                        onClick={() => removeFromCart(item._id)}
                        sx={{
                          color: '#ff5252',
                          p: 0.5,
                          '&:hover': {
                            backgroundColor: 'rgba(255,82,82,0.1)',
                            color: '#d32f2f'
                          }
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}

          {/* Footer with Total */}
          {cartItems.length > 0 && (
            <Box
              sx={{
                mt: 'auto',
                pt: 2,
                borderTop: '2px solid #f0f0f0',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px 12px 0 0',
                p: 2
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 2,
                  px: 1
                }}
              >
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 700, textTransform: 'uppercase' }}>
                  Subtotal:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                  ₹{calculateTotal().toFixed(2)}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Proceed To Checkout
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CartDrawer;
