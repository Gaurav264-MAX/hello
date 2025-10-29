// Reviews.jsx
import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Rating, 
  Paper,
  Avatar,
  Button,
  TextField,
  Stack,
  LinearProgress,
  IconButton,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: '',
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [ratingStats, setRatingStats] = useState({
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/reviews/${productId}`);
      setReviews(response.data);
      
      if (response.data.length > 0) {
        const avg = response.data.reduce((acc, review) => acc + review.rating, 0) / response.data.length;
        setAverageRating(avg);

        const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        response.data.forEach(review => {
          stats[review.rating] = (stats[review.rating] || 0) + 1;
        });
        setRatingStats(stats);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + previewImages.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    files.forEach(file => {
      if (file.size > 5000000) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result]);
        setNewReview(prev => ({
          ...prev,
          images: [...prev.images, file]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.comment) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('name', newReview.name);
      formData.append('rating', newReview.rating);
      formData.append('comment', newReview.comment);
      newReview.images.forEach(image => {
        formData.append('images', image);
      });

      await axios.post('http://localhost:3000/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Review submitted successfully!');
      setNewReview({ name: '', rating: 0, comment: '', images: [] });
      setPreviewImages([]);
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  const ReviewItem = ({ review }) => (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {review.name[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">{review.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(review.date).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
      <Rating value={review.rating} readOnly size="small" />
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
        {review.comment}
      </Typography>
      {review.images && review.images.length > 0 && (
        <ImageList sx={{ width: '100%', height: 120 }} cols={5} rowHeight={100}>
          {review.images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={`http://localhost:3000${image}`}
                alt={`Review ${index + 1}`}
                loading="lazy"
                style={{ height: '100px', objectFit: 'cover' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Paper>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {averageRating.toFixed(1)}
            <Typography component="span" variant="h6" color="text.secondary">
              /5
            </Typography>
          </Typography>
          <Rating value={averageRating} precision={0.1} readOnly size="large" />
          <Typography color="text.secondary">
            Based on {reviews.length} reviews
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          onClick={() => setShowForm(!showForm)}
        >
          Write a Review
        </Button>
      </Box>

      {showForm && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <form onSubmit={handleSubmitReview}>
            <Stack spacing={2}>
              <TextField
                label="Your Name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
                fullWidth
              />
              
              <Box>
                <Typography component="legend">Rating *</Typography>
                <Rating
                  value={newReview.rating}
                  onChange={(_, value) => setNewReview({ ...newReview, rating: value })}
                  required
                />
              </Box>

              <TextField
                label="Your Review"
                multiline
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
                fullWidth
              />

              <Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                    disabled={previewImages.length >= 5}
                  >
                    Add Photos
                  </Button>
                </label>
                <Typography variant="caption" sx={{ ml: 2 }}>
                  (Max 5 images)
                </Typography>
              </Box>

              {previewImages.length > 0 && (
                <ImageList sx={{ width: '100%', height: 120 }} cols={5} rowHeight={100}>
                  {previewImages.map((image, index) => (
                    <ImageListItem key={index} sx={{ position: 'relative' }}>
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        loading="lazy"
                        style={{ height: '100px', objectFit: 'cover' }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => {
                          setPreviewImages(prev => prev.filter((_, i) => i !== index));
                          setNewReview(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }));
                        }}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: 'rgba(255,255,255,0.7)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ImageListItem>
                  ))}
                </ImageList>
              )}

              <Button type="submit" variant="contained">
                Submit Review
              </Button>
            </Stack>
          </form>
        </Paper>
      )}

      {/* Show only first 3 reviews */}
      {reviews.slice(0, 3).map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}

      {/* See All Reviews button */}
      {reviews.length > 3 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowAllReviews(true)}
            sx={{ 
              minWidth: 200,
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white'
              }
            }}
          >
            See All Reviews ({reviews.length})
          </Button>
        </Box>
      )}

      {/* All Reviews Dialog */}
      <Dialog 
        open={showAllReviews} 
        onClose={() => setShowAllReviews(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">All Reviews ({reviews.length})</Typography>
            <IconButton onClick={() => setShowAllReviews(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            {reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Reviews;