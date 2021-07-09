const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const addressSchema = new Schema({
    user_id:String,
    fname:String,
    lname:String,
    address:String,
    pincode:Number,
    locality:String
})
module.exports = mongoose.model('add', addressSchema, 'address')