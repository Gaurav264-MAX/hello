import React, { useState } from 'react';
import { useAuthStatus } from './AuthWrapper';
import { useNavigate } from 'react-router-dom';
import { useFetchUserOrdersQuery } from './apiroute';
import './Myorders.css';

function Myorders() {
  const { status } = useAuthStatus();
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId');
  const { data: orders = [], isLoading: loading, error } = useFetchUserOrdersQuery(userId, {
    skip: status === 'false' || !userId || userId === 'guest'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#4CAF50';
      case 'Shipped':
        return '#2196F3';
      case 'Processing':
        return '#FF9800';
      case 'Cancelled':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  if (status === 'false') {
    return (
      <div className="myorders-container">
        <div className="auth-message">
          <h2>Please Sign In</h2>
          <p>You need to be signed in to view your order history.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="myorders-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="myorders-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="myorders-container">
      <div className="myorders-header">
        <h1>My Order History</h1>
        <p>Track all your past and current orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your order history here!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                  <p className="order-date">Placed on {formatDate(order.orderDate)}</p>
                </div>
                <div className="order-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-image">
                      <img 
                        src={item.image ? `http://localhost:3000${item.image}` : '/src/assets/Image1.png'}
                        alt={item.name || item.title}
                        onError={(e) => {
                          e.target.src = '/src/assets/Image1.png';
                        }}
                      />
                    </div>
                    <div className="item-details">
                      <h4>{item.name || item.title}</h4>
                      {item.heading && <p className="item-heading">{item.heading}</p>}
                      <div className="item-meta">
                        <span className="quantity">Qty: {item.quantity}</span>
                        <span className="price">
                          {formatPrice(item.newprice || item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Total Amount:</span>
                  <span className="total-amount">{formatPrice(order.totalAmount)}</span>
                </div>
                <div className="order-actions">
                  <button
                    className="btn-view-details"
                    onClick={() =>
                      setExpandedOrderId(expandedOrderId === order._id ? null : order._id)
                    }
                  >
                    {expandedOrderId === order._id ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
        className="btn-generate-invoice"
        onClick={() => navigate(`/invoice/${order._id}`)}
      >
        Generate Invoice
      </button>
                </div>
              </div>

              {/* Expanded summary section */}
              {expandedOrderId === order._id && (
                <div className="order-details-summary">
                  <div className="order-details-section">
                    <h4>Delivery Details</h4>
                    <p><strong>Name:</strong> {order.deliveryDetails?.name}</p>
                    <p><strong>Mobile:</strong> {order.deliveryDetails?.mobile}</p>
                    <p><strong>Address:</strong> {order.deliveryDetails?.address}</p>
                    <p><strong>City:</strong> {order.deliveryDetails?.city}</p>
                    <p><strong>PIN Code:</strong> {order.deliveryDetails?.pincode}</p>
                  </div>
                  <div className="order-details-section">
                    <h4>Items</h4>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-details-item">
                        <img
                          src={item.image ? `http://localhost:3000${item.image}` : '/src/assets/Image1.png'}
                          alt={item.name || item.title}
                          style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 10 }}
                          onError={(e) => {
                            e.target.src = '/src/assets/Image1.png';
                          }}
                        />
                        <span>{item.name || item.title} (Qty: {item.quantity}) - {formatPrice(item.newprice || item.price)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-details-section">
                    <h4>Total</h4>
                    <p>{formatPrice(order.totalAmount)}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Myorders;
