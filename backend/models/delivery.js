const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the person receiving the delivery
    mobile: { type: String, required: true }, // Mobile number
    city: { type: String, required: true }, // City
    pincode: { type: String, required: true }, // Postal/ZIP code
    address: { type: String, required: true }, // Delivery address
});

const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;