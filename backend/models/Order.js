const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true 
    },
    deliveryDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery',
        required: true
    },
    items: [{
        productId: {
            type: String,  // Changed from mongoose.Schema.Types.ObjectId to String
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true
        },
        price: Number,
        image: String,
        title: String,    // Added this
        newprice: Number, // Added this
        heading: String   // Added this
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;