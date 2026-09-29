const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    movieName: {
        type: String,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        required: true
    },
    numberOfTickets: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Booking", bookingSchema);