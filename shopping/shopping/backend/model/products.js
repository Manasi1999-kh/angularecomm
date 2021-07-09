const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    user_id: String,
    address_id: String,
    products: [{
        id:Number,
        name:String,
        price:Number,
        cart:Number
    }
    ],
    totalPrice: Number,
    totalQuantity: Number
})
module.exports = mongoose.model('p', userSchema, 'products')