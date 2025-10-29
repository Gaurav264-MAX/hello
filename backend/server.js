const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Machine = require('./models/machine.js');
const Product = require('./models/Product.js');
const Tv = require('./models/tv.js');
const Ac = require('./models/ac.js');
const Delivery = require('./models/delivery.js');
const Register = require('./models/register.js');
const Order = require('./models/Order.js');
const Review = require('./models/review.js');
const multer = require('multer');
// MongoDB connection
mongoose
    .connect('mongodb+srv://gaurav62838amazon:ZP2K5XT9i83CkHwv@ecom.lunui3o.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Ecommerce', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
        
    })
    .then((e) => console.log("MongoDB connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Log models for debugging
console.log("Machine model:", !!Machine);
console.log("TV model:", !!Tv);
console.log("AC model:", !!Ac);

const app = express();

app.use(express.json({ limit: '10mb' }));
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
};

app.use(cors(corsOptions));

// Configure multer for in-memory storage (files will be stored as base64 in MongoDB)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit per file
    }
});

// Helper function to convert buffer to base64 with data URL prefix
const bufferToBase64 = (buffer, mimetype) => {
    return `data:${mimetype};base64,${buffer.toString('base64')}`;
};

const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]);

// Review storage configuration (also using memory storage now)
const reviewUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Basic route
app.get('/', (req, res) => {
    res.send("Hello from the backend");
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error in registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Product routes
app.post("/product", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

app.get("/product", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Machine routes
app.post("/machine", uploadFields, async (req, res) => {
    try {
        const { title, newprice, oldprice, discount, delivery, description, feature, heading, stock } = req.body;

        if (!req.files || !req.files.image || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({ message: "All three images are required" });
        }

        // Convert uploaded files to base64 data URLs
        const imageBase64_1 = bufferToBase64(req.files.image[0].buffer, req.files.image[0].mimetype);
        const imageBase64_2 = bufferToBase64(req.files.image2[0].buffer, req.files.image2[0].mimetype);
        const imageBase64_3 = bufferToBase64(req.files.image3[0].buffer, req.files.image3[0].mimetype);
        let features = feature;
        if (typeof features === 'string') {
            try {
                features = JSON.parse(features);
            } catch {
                // fallback: wrap as array if not valid JSON
                features = [features];
            }
        }
        const newMachine = new Machine({
            title,
            image: imageBase64_1,
            image2: imageBase64_2,
            image3: imageBase64_3,
            newprice,
            oldprice,
            discount,
            delivery,
            description,
            feature:features,
            heading,
            stock,
        });

        await newMachine.save();
        res.status(201).json({ message: "Machine added successfully", machine: newMachine });
    } catch (error) {
        console.error("Error adding machine:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/machine", async (req, res) => {
    try {
        const machines = await Machine.find();
        res.status(200).json(machines);
    } catch (error) {
        console.error("Error fetching machines:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/machine/:id", async (req, res) => {
    try {
        const product = await Machine.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// TV routes (using the same upload configuration)
const uploadFieldsTv = uploadFields; // Reuse the same configuration

// TV routes
app.post("/tv", uploadFieldsTv, async (req, res) => {
    try {
        const { title, newprice, oldprice, discount, delivery, description, feature, heading, stock } = req.body;

        if (!req.files || !req.files.image || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({ message: "All three images are required" });
        }

        // Convert uploaded files to base64 data URLs
        const imageBase64_1 = bufferToBase64(req.files.image[0].buffer, req.files.image[0].mimetype);
        const imageBase64_2 = bufferToBase64(req.files.image2[0].buffer, req.files.image2[0].mimetype);
        const imageBase64_3 = bufferToBase64(req.files.image3[0].buffer, req.files.image3[0].mimetype);
        let features = feature;
        if (typeof features === 'string') {
            try {
                features = JSON.parse(features);
            } catch {
                // fallback: wrap as array if not valid JSON
                features = [features];
            }
        }
        const newTv = new Tv({
            title,
            image: imageBase64_1,
            image2: imageBase64_2,
            image3: imageBase64_3,
            newprice,
            oldprice,
            discount,
            delivery,
            description,
            feature:features,
            heading,
            stock,
        });

        await newTv.save();
        res.status(201).json({ message: "TV added successfully", tv: newTv });
    } catch (error) {
        console.error("Error adding TV:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/tv", async (req, res) => {
    try {
        const tv = await Tv.find();
        res.status(200).json(tv);
    } catch (error) {
        console.error("Error fetching tv:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/tv/:id", async (req, res) => {
    try {
        const tv = await Tv.findById(req.params.id);
        if (!tv) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(tv);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// AC routes (using the same upload configuration)
const uploadFieldsAc = uploadFields; // Reuse the same configuration

// AC routes
app.post("/ac", uploadFieldsAc, async (req, res) => {
    try {
        const { title, newprice, oldprice, discount, delivery, description, feature, heading, stock } = req.body;

        if (!req.files || !req.files.image || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({ message: "All three images are required" });
        }

        // Convert uploaded files to base64 data URLs
        const imageBase64_1 = bufferToBase64(req.files.image[0].buffer, req.files.image[0].mimetype);
        const imageBase64_2 = bufferToBase64(req.files.image2[0].buffer, req.files.image2[0].mimetype);
        const imageBase64_3 = bufferToBase64(req.files.image3[0].buffer, req.files.image3[0].mimetype);
        let features = feature;
        if (typeof features === 'string') {
            try {
                features = JSON.parse(features);
            } catch {
                // fallback: wrap as array if not valid JSON
                features = [features];
            }
        }
        const newAc = new Ac({
            title,
            image: imageBase64_1,
            image2: imageBase64_2,
            image3: imageBase64_3,
            newprice,
            oldprice,
            discount,
            delivery,
            description,
            feature:features,
            heading,
            stock,
        });

        await newAc.save();
        res.status(201).json({ message: "AC added successfully", ac: newAc });
    } catch (error) {
        console.error("Error adding AC:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/ac", async (req, res) => {
    try {
        const ac = await Ac.find();
        res.status(200).json(ac);
    } catch (error) {
        console.error("Error fetching AC:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/ac/:id", async (req, res) => {
    try {
        const ac = await Ac.findById(req.params.id);
        if (!ac) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(ac);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Washing machine routes (using machine model)
app.post("/washingmachine", uploadFields, async (req, res) => {
    try {
        const { title, newprice, oldprice, discount, delivery, description, feature, heading, stock } = req.body;

        if (!req.files || !req.files.image || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({ message: "All three images are required" });
        }

        // Convert uploaded files to base64 data URLs
        const imageBase64_1 = bufferToBase64(req.files.image[0].buffer, req.files.image[0].mimetype);
        const imageBase64_2 = bufferToBase64(req.files.image2[0].buffer, req.files.image2[0].mimetype);
        const imageBase64_3 = bufferToBase64(req.files.image3[0].buffer, req.files.image3[0].mimetype);
        let features = feature;
        if (typeof features === 'string') {
            try {
                features = JSON.parse(features);
            } catch {
                // fallback: wrap as array if not valid JSON
                features = [features];
            }
        }
        const newMachine = new Machine({
            title,
            image: imageBase64_1,
            image2: imageBase64_2,
            image3: imageBase64_3,
            newprice,
            oldprice,
            discount,
            delivery,
            description,
            feature:features,
            heading,
            stock,
        });

        await newMachine.save();
        res.status(201).json({ message: "Washing machine added successfully", machine: newMachine });
    } catch (error) {
        console.error("Error adding washing machine:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/washingmachine", async (req, res) => {
    try {
        const machines = await Machine.find();
        res.status(200).json(machines);
    } catch (error) {
        console.error("Error fetching washing machines:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/washingmachine/:id", async (req, res) => {
    try {
        const product = await Machine.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Delivery routes
app.post("/delivery", async (req, res) => {
    const deliverydata = new Delivery(req.body);
    await deliverydata.save();
    res.json(deliverydata);
});

app.get("/data", async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register route
app.post("/register", async (req, res) => {
    const { email, uid, phone, password } = req.body;
    try {
        let user = await Register.findOne({ email });
        if (!user) {
            user = new Register({ email, uid, phone, password });
            await user.save();
        }
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error });
    }
});

// Order routes
app.post("/orders", async (req, res) => {
    try {
        const { deliveryDetails, items, totalAmount, userId } = req.body;
        const newOrder = new Order({
            userId,
            deliveryDetails,
            items,
            totalAmount
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
});

app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('deliveryDetails')
            .sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});

app.get("/orders/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('deliveryDetails');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error: error.message });
    }
});

app.get("/orders/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .populate('deliveryDetails')
            .sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user orders", error: error.message });
    }
});

app.put("/orders/:id/status", async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true }
        ).populate('deliveryDetails');
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
});

// Review routes
app.post('/reviews', reviewUpload.array('images', 5), async (req, res) => {
    try {
        const reviewData = {
            ...req.body,
            images: req.files ? req.files.map(file => bufferToBase64(file.buffer, file.mimetype)) : []
        };
        const review = new Review(reviewData);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/reviews/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId })
            .sort({ date: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Test endpoint for debugging
app.get("/test-search", (req, res) => {
    const query = req.query.q || '';
    console.log('Test search for:', query);
    res.json({ message: "Test endpoint working", query });
});

// New search endpoint with different path
app.get("/api/machine-search", async (req, res) => {
    try {
        const query = req.query.q || '';
        console.log('Searching machines for:', query);
        
        if (!query.trim()) {
            return res.json([]);
        }

        // Check if model exists
        if (!Machine) {
            console.error("Machine model is not defined");
            return res.status(500).json({ message: "Model not available" });
        }

        // Debug schema
        console.log("Machine schema:", Machine.schema.paths);
        
        const machines = await Machine.find({
            title: { $regex: query, $options: 'i' }
        }).select('title image newprice _id');
        
        console.log('Found machines:', machines.length);
        res.json(machines);
    } catch (error) {
        console.error("Machine search error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });
    }
});

// New search endpoint with different path for TV
app.get("/api/tv-search", async (req, res) => {
    try {
        const query = req.query.q || '';
        console.log('Searching TVs for:', query);
        
        if (!query.trim()) {
            return res.json([]);
        }

        // Check if model exists
        if (!Tv) {
            console.error("TV model is not defined");
            return res.status(500).json({ message: "Model not available" });
        }
        
        const tvs = await Tv.find({
            title: { $regex: query, $options: 'i' }
        }).select('title image newprice _id');
        
        console.log('Found TVs:', tvs.length);
        res.json(tvs);
    } catch (error) {
        console.error("TV search error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });
    }
});

// New search endpoint with different path for AC
app.get("/api/ac-search", async (req, res) => {
    try {
        const query = req.query.q || '';
        console.log('Searching ACs for:', query);
        
        if (!query.trim()) {
            return res.json([]);
        }

        // Check if model exists
        if (!Ac) {
            console.error("AC model is not defined");
            return res.status(500).json({ message: "Model not available" });
        }
        
        const acs = await Ac.find({
            title: { $regex: query, $options: 'i' }
        }).select('title image newprice _id');
        
        console.log('Found ACs:', acs.length);
        res.json(acs);
    } catch (error) {
        console.error("AC search error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message, stack: error.stack });
    }
});

// TEMPORARY: Update route for Machine
app.post('/machine/update/:id', uploadFields, async (req, res) => {
    try {
        const updateFields = { ...req.body };
        
        // Convert uploaded files to base64 if new images are provided
        if (req.files && req.files.image) {
            updateFields.image = bufferToBase64(req.files.image[0].buffer, req.files.image[0].mimetype);
        }
        if (req.files && req.files.image2) {
            updateFields.image2 = bufferToBase64(req.files.image2[0].buffer, req.files.image2[0].mimetype);
        }
        if (req.files && req.files.image3) {
            updateFields.image3 = bufferToBase64(req.files.image3[0].buffer, req.files.image3[0].mimetype);
        }
        
        if (typeof updateFields.feature === 'string') {
            try { updateFields.feature = JSON.parse(updateFields.feature); } catch {}
        }
        
        const updated = await Machine.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Machine updated successfully', machine: updated });
    } catch (error) {
        console.error('Error updating Machine:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// TEMPORARY: Update route for TV
app.post('/tv/update/:id', uploadFieldsTv, async (req, res) => {
    try {
        const updateFields = { ...req.body };
        
        // Convert uploaded files to base64 if new images are provided
        if (req.files && req.files.image) {
            updateFields.image = bufferToBase64(req.files.image[0].buffer, req.files.image[0].mimetype);
        }
        if (req.files && req.files.image2) {
            updateFields.image2 = bufferToBase64(req.files.image2[0].buffer, req.files.image2[0].mimetype);
        }
        if (req.files && req.files.image3) {
            updateFields.image3 = bufferToBase64(req.files.image3[0].buffer, req.files.image3[0].mimetype);
        }
        
        if (typeof updateFields.feature === 'string') {
            try { updateFields.feature = JSON.parse(updateFields.feature); } catch {}
        }
        
        const updated = await Tv.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'TV updated successfully', tv: updated });
    } catch (error) {
        console.error('Error updating TV:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// TEMPORARY: Update route for AC
app.post('/ac/update/:id', uploadFieldsAc, async (req, res) => {
    try {
        const updateFields = { ...req.body };
        
        // Convert uploaded files to base64 if new images are provided
        if (req.files && req.files.image) {
            updateFields.image = bufferToBase64(req.files.image[0].buffer, req.files.image[0].mimetype);
        }
        if (req.files && req.files.image2) {
            updateFields.image2 = bufferToBase64(req.files.image2[0].buffer, req.files.image2[0].mimetype);
        }
        if (req.files && req.files.image3) {
            updateFields.image3 = bufferToBase64(req.files.image3[0].buffer, req.files.image3[0].mimetype);
        }
        
        if (typeof updateFields.feature === 'string') {
            try { updateFields.feature = JSON.parse(updateFields.feature); } catch {}
        }
        
        const updated = await Ac.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'AC updated successfully', ac: updated });
    } catch (error) {
        console.error('Error updating AC:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// TEMPORARY: Delete route for Machine
app.delete('/machine/:id', async (req, res) => {
  try {
    const deleted = await Machine.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Machine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// TEMPORARY: Delete route for AC
app.delete('/ac/:id', async (req, res) => {
  try {
    const deleted = await Ac.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'AC deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// TEMPORARY: Delete route for TV
app.delete('/tv/:id', async (req, res) => {
  try {
    const deleted = await Tv.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'TV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
    
    // Log all registered routes for debugging
    console.log("Registered routes:");
    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
            console.log(r.route.path);
        }
    });
});