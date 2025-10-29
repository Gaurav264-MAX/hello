import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button, TextField, Paper, Divider, MenuItem, Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

// Mock user data
const mockUser = {
  username: 'johnnydoe',
  name: 'John Doe',
  email: 'john.doe@example.com',
  mobile: '9876543210',
  address: '123 Main St, Mumbai, India',
  paymentMethod: 'Credit Card',
  avatar: '',
};

const paymentMethods = [
  'Credit Card',
  'Debit Card',
  'UPI',
  'Net Banking',
  'Cash on Delivery',
];

const ProfileDashboard = () => {
  const [user, setUser] = useState(mockUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...mockUser });
  const [changeEmailMode, setChangeEmailMode] = useState(false);
  const [newEmail, setNewEmail] = useState(mockUser.email);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  // Dynamically fill user data from Firebase auth
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate('/signup');
      return;
    }
    if (currentUser) {
      const dynamicUser = {
        username: currentUser.displayName || currentUser.email?.split('@')[0] || '',
        name: currentUser.displayName || '',
        email: currentUser.email || '',
        mobile: currentUser.phoneNumber || '',
        address: '', // You may want to fetch this from Firestore or backend
        paymentMethod: '', // You may want to fetch this from Firestore or backend
        avatar: currentUser.photoURL || '',
      };
      // Check for delivery details in localStorage
      const deliveryDetails = JSON.parse(localStorage.getItem('lastDeliveryDetails') || 'null');
      if (deliveryDetails) {
        if (!dynamicUser.name && deliveryDetails.name) dynamicUser.name = deliveryDetails.name;
        if (!dynamicUser.mobile && deliveryDetails.mobile) dynamicUser.mobile = deliveryDetails.mobile;
        if (!dynamicUser.address && deliveryDetails.address) dynamicUser.address = deliveryDetails.address;
        // Optionally combine city/pincode into address
        if (!dynamicUser.address && deliveryDetails.city && deliveryDetails.pincode) {
          dynamicUser.address = `${deliveryDetails.city}, ${deliveryDetails.pincode}`;
        }
        if (!dynamicUser.paymentMethod && deliveryDetails.paymentMethod) dynamicUser.paymentMethod = deliveryDetails.paymentMethod;
      }
      setUser(dynamicUser);
      setForm(dynamicUser);
      setNewEmail(dynamicUser.email);
      setProfilePic(dynamicUser.avatar);
    }
  }, [navigate]);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.photoURL) {
        setProfilePic(user.photoURL);
      } else {
        setProfilePic(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setForm({ ...user });
    setChangeEmailMode(false);
    setNewEmail(user.email);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    setUser({ ...user, ...form, email: newEmail });
    setEditMode(false);
    setChangeEmailMode(false);
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out');
        navigate('/signup');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };
  const handleChangeEmail = () => {
    setChangeEmailMode(true);
  };
  const handleEmailInput = (e) => {
    setNewEmail(e.target.value);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 0,
      m: 0,
    }}>
      <Paper elevation={4} sx={{
        position: 'relative',
        overflow: 'hidden',
        width: { xs: '98vw', sm: '90vw', md: '80vw', lg: '70vw' },
        maxWidth: 1200,
        minHeight: '80vh',
        p: { xs: 2, sm: 4, md: 6 },
        borderRadius: 5,
        background: '#fff',
        boxShadow: '0 8px 32px 0 rgba(56, 189, 248, 0.10)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '40%',
          background: 'linear-gradient(120deg, rgba(56,189,248,0.10) 0%, rgba(255,255,255,0.10) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          filter: 'blur(1.5px)',
        },
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 5, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
          <Avatar sx={{
            width: 120,
            height: 120,
            bgcolor: '#e3f0ff',
            border: '4px solid #90cdf4',
            background: 'linear-gradient(135deg, #e3f0ff 0%, #90cdf4 100%)',
            color: '#2563eb',
            fontSize: 56,
            boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
          }}>
            {user.name[0]}
          </Avatar>
          <Box>
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                letterSpacing: 2,
                mb: 0.5,
                color: '#232946',
                textShadow: '0 2px 8px rgba(35,41,70,0.08)',
                fontFamily: 'Poppins, Roboto, Arial, sans-serif',
                lineHeight: 1.1,
              }}
            >
              {user.name}
            </Typography>
            <Typography
              sx={{
                color: '#6c757d',
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: 1,
                fontFamily: 'Poppins, Roboto, Arial, sans-serif',
                mb: 0.5,
                textShadow: '0 1px 4px rgba(35,41,70,0.06)',
              }}
            >
              @{user.username}
            </Typography>
            <Typography
              sx={{
                color: '#232946',
                fontWeight: 500,
                fontSize: 22,
                fontFamily: 'Poppins, Roboto, Arial, sans-serif',
                mb: 0.5,
                textShadow: '0 1px 4px rgba(35,41,70,0.04)',
              }}
            >
              {user.email}
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                size="large"
                onClick={handleEdit}
                disabled={editMode}
                sx={{
                  background: 'linear-gradient(90deg, #60a5fa 0%, #38bdf8 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: '0 2px 8px 0 rgba(56,189,248,0.10)',
                  '&:hover': { background: 'linear-gradient(90deg, #38bdf8 0%, #60a5fa 100%)' },
                }}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                size="large"
                onClick={handleLogout}
                sx={{ fontWeight: 600, borderRadius: 3 }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 4, borderColor: '#e0e5ec', position: 'relative', zIndex: 2 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#232946', letterSpacing: 1, mb: 3, textShadow: '0 2px 8px rgba(35,41,70,0.08)', position: 'relative', zIndex: 2 }}>
          <span style={{
            fontFamily: 'Poppins, Roboto, Arial, sans-serif',
            fontWeight: 800,
            fontSize: '2.2rem',
            color: '#232946',
            letterSpacing: 2,
            textShadow: '0 2px 8px rgba(35,41,70,0.08)',
          }}>
            Account Details
          </span>
        </Typography>
        {editMode ? (
          <Box component="form" sx={{ mt: 2, position: 'relative', zIndex: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  fullWidth
                  size="large"
                  sx={{ mb: 2, background: '#f7fafc', borderRadius: 2, color: '#232946', input: { color: '#232946' }, label: { color: '#6c757d' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  size="large"
                  sx={{ mb: 2, background: '#f7fafc', borderRadius: 2, color: '#232946', input: { color: '#232946' }, label: { color: '#6c757d' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Mobile Number"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  fullWidth
                  size="large"
                  sx={{ mb: 2, background: '#f7fafc', borderRadius: 2, color: '#232946', input: { color: '#232946' }, label: { color: '#6c757d' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  fullWidth
                  size="large"
                  sx={{ mb: 2, background: '#f7fafc', borderRadius: 2, color: '#232946', input: { color: '#232946' }, label: { color: '#6c757d' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {changeEmailMode ? (
                  <TextField
                    label="New Email"
                    name="newEmail"
                    value={newEmail}
                    onChange={handleEmailInput}
                    fullWidth
                    size="large"
                    sx={{ mb: 2, background: '#f7fafc', borderRadius: 2, color: '#232946', input: { color: '#232946' }, label: { color: '#6c757d' } }}
                  />
                ) : (
                  <TextField
                    label="Email"
                    name="email"
                    value={newEmail}
                    fullWidth
                    size="large"
                    sx={{ mb: 2, background: '#f7fafc', borderRadius: 2, color: '#232946', input: { color: '#232946' }, label: { color: '#6c757d' } }}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Button size="small" onClick={handleChangeEmail} sx={{ ml: 1, color: '#6c757d', fontWeight: 600 }}>
                          Change
                        </Button>
                      )
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Payment Method"
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  fullWidth
                  size="large"
                  sx={{ mb: 2, background: '#f7fafc', borderRadius: 2, color: '#232946', input: { color: '#232946' }, label: { color: '#6c757d' } }}
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method} value={method}>{method}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{
                  background: 'linear-gradient(90deg, #e0e5ec 0%, #f7fafc 100%)',
                  color: '#232946',
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
                  '&:hover': { background: 'linear-gradient(90deg, #f7fafc 0%, #e0e5ec 100%)' },
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleCancel}
                sx={{ fontWeight: 600, borderRadius: 3 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: 2, position: 'relative', zIndex: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{ fontWeight: 600, color: '#232946', fontSize: 20 }}><b>Username:</b> {user.username}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{ fontWeight: 600, color: '#232946', fontSize: 20 }}><b>Full Name:</b> {user.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{ fontWeight: 600, color: '#232946', fontSize: 20 }}><b>Mobile Number:</b> {user.mobile}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{ fontWeight: 600, color: '#232946', fontSize: 20 }}><b>Address:</b> {user.address}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{ fontWeight: 600, color: '#232946', fontSize: 20 }}><b>Email:</b> {user.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{ fontWeight: 600, color: '#232946', fontSize: 20 }}><b>Payment Method:</b> {user.paymentMethod}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProfileDashboard; 