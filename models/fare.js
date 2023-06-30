const mongoose = require('mongoose')

const FareSchema = new mongoose.Schema({
    origin: {
        type: String,
        trim: true,
        required: [true, "Please add an Origin"]
    },
    destination: {
        type: String,
        trim: true,
        required: [true, "Please add a Destination"]
    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Please add the price"]
    },
    currency: {
        type: String,
        trim: true,
        required: [true, "Please add the currency"]
    },
    currencySymbol: {
        type: String,
        trim: true,
        required: [true, "Please add the currency symbol"]
    },
    currencyToDisplay: {
        type: String,
    },
});

module.exports = mongoose.model('Fare', FareSchema);