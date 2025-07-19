const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true,
        unique: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "ORDERED",
        enum: ["ORDERED", "CANCLED", "DELEVERED", "PROCESSING", "OUT_FOR_DELEVERY"]
    },
    address: {
        type: String,
        minLength: [10, "address should be of atleast 10 characters"]
    },
    paymentMethod: {
        type: String,
        enum: ["ONLINE", "CASH"]
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;