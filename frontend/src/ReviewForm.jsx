import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Rating, 
  Typography,
  Paper
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating || !comment || !name) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/reviews', {
        productId,
        name,
        rating,
        comment,
        date: new Date()
      });

      if (response.data) {
        toast.success('Review submitted successfully!');
        // Clear form
        setRating(0);
        setComment('');
        setName('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', my: 3 }}>
      <Typography variant="h6" gutterBottom>
        Write a Review
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            precision={0.5}
            required
          />
        </Box>

        <TextField
          label="Your Review"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          fullWidth
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ alignSelf: 'flex-start' }}
        >
          Submit Review
        </Button>
      </Box>
    </Paper>
  );
};

export default ReviewForm; 