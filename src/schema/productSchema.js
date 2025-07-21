const mongoose = require('mongoose');
// const { applyTimestamps } = require('./userSchema');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        minLength: [5, "Product name mush be atleast 5 characters"],
        trim: true
    },
    description: {
        type: String,
        minLength: [5, "Product description mush be atleast 5 characters"]
    },
    productImage: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    quantity: {
        type: Number,
        required: true, 
        default: 10
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg', 'drinks', 'sides'],
        default: 'veg'
    },
    inStock: {
        type: Boolean,
        required: [true, "In stosk status is required"],
        default: true
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product