import express from 'express';
import { create, getAll, getById, update, remove, delivery } from './userController.js';

const router = express.Router();

// Route to create a new delivery entry
router.post('/create', create);

// Route to get all delivery entries
router.get('/getAll', getAll);

// Route to get a delivery entry by ID
router.get('/getById/:id', getById);

// Route to update a delivery entry by ID
router.put('/update/:id', update);

// Route to remove a delivery entry by ID
router.delete('/remove/:id', remove);

// Route to handle delivery form submission (POST)
router.post('/delivery', delivery);

// Route to fetch all delivery entries (GET)
router.get('/data', getAllDeliveries); // Assuming you want to fetch all delivery entries

export default router;