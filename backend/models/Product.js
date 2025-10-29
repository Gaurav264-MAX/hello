const mongoose= require("mongoose");

const productSchema = new mongoose.Schema({
    type: String,
    image: {
        type: String,
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
        type: String,
        required: true,
    },
    heading:{
        type: String,
        required: true,
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports=Product;
