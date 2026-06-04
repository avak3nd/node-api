const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./mongodb/connect");
const gamesRoutes = require("./router/gamesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to React Games API",
    });
});

app.use("/api/games", gamesRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;