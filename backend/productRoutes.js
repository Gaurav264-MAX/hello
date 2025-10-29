import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Create Product
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

// Get Products
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

export default router;
