const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    phone: { type: String, required: true }, // Name of the person receiving the delivery
    email: { type: String, required: true }, // Mobile number
    password: { type: String, required: true }, // City
});

const Register = mongoose.model("Register", registerSchema);
module.exports = Register;