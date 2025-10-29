import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  IconButton,
  Collapse,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

// Row component for expandable order details
const Row = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order._id}</TableCell>
        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
        <TableCell>{order.deliveryDetails.name}</TableCell>
        <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
        <TableCell>
          <Chip
            label={order.orderStatus}
            color={
              order.orderStatus === 'Delivered' ? 'success' :
              order.orderStatus === 'Processing' ? 'warning' :
              order.orderStatus === 'Pending' ? 'info' : 'default'
            }
            size="small"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Grid container spacing={3}>
                {/* Delivery Details */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalShippingIcon color="primary" />
                        Delivery Details
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Name: {order.deliveryDetails.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Mobile: {order.deliveryDetails.mobile}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Address: {order.deliveryDetails.address}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        City: {order.deliveryDetails.city}
                      </Typography>
                      <Typography variant="body2">
                        PIN Code: {order.deliveryDetails.pincode}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Order Items */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShoppingBasketIcon color="primary" />
                        Order Items
                      </Typography>
                      {order.items.map((item, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={3}>
                              <Box
                                component="img"
                                src={`http://localhost:3000${item.image}`}
                                alt={item.title}
                                sx={{
                                  width: '100%',
                                  height: 'auto',
                                  borderRadius: 1,
                                  objectFit: 'cover'
                                }}
                              />
                            </Grid>
                            <Grid item xs={9}>
                              <Typography variant="subtitle2">{item.title}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Quantity: {item.quantity}
                              </Typography>
                              <Typography variant="body2" color="primary">
                                ₹{item.price.toFixed(2)}
                              </Typography>
                            </Grid>
                          </Grid>
                          {index < order.items.length - 1 && <Divider sx={{ my: 1 }} />}
                        </Box>
                      ))}
                      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
                        <Typography variant="subtitle1" align="right">
                          Total: ₹{order.totalAmount.toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading orders...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Orders History
      </Typography>
      
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <Row key={order._id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrdersList;