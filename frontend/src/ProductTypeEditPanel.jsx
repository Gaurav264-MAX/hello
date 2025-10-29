import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Carrom from './Carrom.jsx';
import ProductForm from './ProductForm.jsx';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useFetchProductsQuery, useDeleteProductMutation, useAddProductMutation } from './apiroute.js';

const ProductTypeEditPanel = () => {
  const { type } = useParams();
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  // get refetch so we can refresh after mutations
  const { data: products = [], isLoading, refetch } = useFetchProductsQuery(type);
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAdd = () => setShowAdd(true);
  const handleEdit = (product) => { setEditProduct(product); setShowEdit(true); };
  const handleClose = () => { setShowAdd(false); setShowEdit(false); setEditProduct(null); };

  const handleProductChanged = async () => {
    if (refetch) await refetch();
    handleClose();
  };

  const handleBack = () => navigate('/');

  const handleDelete = async (product) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct({ type, productId: product._id }).unwrap();
      if (refetch) await refetch();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting product');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Admin Panel: Edit {type?.toUpperCase?.()}</Typography>

      <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2, mr: 2 }}>Add Product</Button>
      <Button variant="contained" color="primary" onClick={handleBack} sx={{ mb: 2 }}>Back</Button>

      <Box
        sx={{
          display: 'grid',
          // force exactly 4 cards per row
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          alignItems: 'start'
        }}
      >
        {products.length > 0 ? products.map((product) => (
          <Box
            key={product._id}
            sx={{
              alignSelf: 'start',
              position: 'relative',
              width: '100%',
              // ensure the card fills the grid column
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'visible',
              margin: '0',
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: 'transparent',
              // let inner content determine height
              height: 'auto',
              p: 0
            }}
          >
            {/* action buttons stretched across top but spaced to left/right */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              position: 'absolute',
              top: 8,
              left: 8,
              right: 8,
              zIndex: 20,
              pointerEvents: 'auto'
            }}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 2, minWidth: 72 }}
                onClick={() => handleEdit(product)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 2, minWidth: 72 }}
                onClick={() => handleDelete(product)}
              >
                Delete
              </Button>
            </Box>

            {/* Force Carrom to use full width of the card; override internal fixed widths if any */}
            <Box sx={{
              width: '100%',
              display: 'block',
              pt: 5, // avoid overlap with top buttons
              px: 1,
              '& > *': {
                width: '100% !important',
                maxWidth: '100% !important',
                boxSizing: 'border-box'
              }
            }}>
              <Carrom product={{ ...product, heading: type }} />
            </Box>
          </Box>
        )) : (
          <Typography>No products available</Typography>
        )}
      </Box>

      {/* Add Modal */}
      <Modal open={showAdd} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          bgcolor: 'white', borderRadius: 2, maxWidth: '1400px', width: '90vw', maxHeight: '90vh',
          overflowY: 'auto', boxShadow: 24, p: 4
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Add New Product</Typography>
          <ProductForm
            onProductAdded={handleProductChanged}
            route={`http://localhost:3000/${type === 'washingmachine' ? 'machine' : type}`}
            initialProduct={{ heading: type === 'washingmachine' ? 'machine' : type }}
          />
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={showEdit} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          bgcolor: 'white', borderRadius: 2, maxWidth: '1400px', width: '90vw', maxHeight: '90vh',
          overflowY: 'auto', boxShadow: 24, p: 4
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Edit Product</Typography>
          {editProduct && (
            <ProductForm
              initialProduct={editProduct}
              route={`http://localhost:3000/${type === 'washingmachine' ? 'machine' : type}/update/${editProduct._id}`}
              onProductAdded={handleProductChanged}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductTypeEditPanel;