const mongoose= require("mongoose");

const acSchema = new mongoose.Schema({
    title: String,
    image: {
        type: String, // Base64 encoded image data
        required: true,
    },
    image2: {
        type: String, // Base64 encoded image data
        required: true,
    },
    image3: {
        type: String, // Base64 encoded image data
        required: true,
    },
    newprice: {
        type: Number,
        required: true,
    },
    
oldprice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    delivery: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    feature:{
        type: [String],
        required: true,
    },
    heading:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
});

const Ac = mongoose.model("Ac", acSchema);
module.exports=Ac;
