const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    email:String,
    phone:Number,
    password: String,
    image:String,
    pincode:String,
    dob:String,
    locality:String,
    gender:String
})
module.exports = mongoose.model('user', userSchema, 'users')