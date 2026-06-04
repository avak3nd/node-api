const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./mongodb/connect");
const gamesRoutes = require("./router/gamesRoutes");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like Postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    })
);

// IMPORTANT: handle preflight requests
app.options("*", cors());

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to React Games API",
    });
});

app.use("/api/games", gamesRoutes);

module.exports = app;