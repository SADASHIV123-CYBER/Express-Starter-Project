const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"], 
        minlength: [5, "First name must be atleast 5 characher long"],
        lowercase: true,
        trim: true,
        maxlength: [20, "First name should be less than or equal to 20 characters"]
    },

    lastName: {
        type: String,
        required: [true, "First Name is required"], 
        minlength: [5, "First name must be atleast 5 characher long"],
        lowercase: true,
        trim: true,
        maxlength: [20, "First name should be less than or equal to 20 characters"]
    },

    mobileNumber: {
        type: String,
        trim: true,
        unique: [true, " phone number is already in use"],
        maxlength: [10, "phone number should be of length 10"],
        minlength: [10, "phone number should be of length 10"],
        required: [true, "phone number should be provided"]
    }, 

    email: {
        type: String,
        trim: true, 
        required: [true, " email should be probided"], 
        unique: [true, "email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 

    password: {
        type: String,
        required: [true, "password should be provided"],
        minlength: [6, "password should be minimum 6 character long"]

    }

}, {
    timestamps: true
});

userSchema.pre('save', async function ()  {
    // here u can modify your user before it is saved in mongodb
    const hashedPassword = await  bcrypt.hash(this.password, 10);
    this.password = hashedPassword
})

const User = mongoose.model("User", userSchema); //collection

module.exports = User; 