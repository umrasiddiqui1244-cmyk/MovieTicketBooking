const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Movie = require("./modelss/Movie");
const Booking = require("./modelss/Booking");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/movieTicketDB")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render("index", { movies: movies });
    } catch (error) {
        res.send("Error loading movies: " + error.message);
    }
});

app.post("/book", async (req, res) => {
    try {
        const newBooking = new Booking({
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            movieName: req.body.movieName,
            seatNumber: req.body.seatNumber,
            bookingDate: req.body.bookingDate,
            numberOfTickets: req.body.numberOfTickets
        });

        await newBooking.save();

      res.render("success", { booking: newBooking });
    } catch (error) {
        res.send("Booking failed: " + error.message);
    }
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});