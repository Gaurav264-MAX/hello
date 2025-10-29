const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    
}, {timestamps: true});




const User = model('user', userSchema);

module.exports = User;

// fullName: {
//     type: String,
//     required: true,
// },
// salt: {
//     type: String,
// },