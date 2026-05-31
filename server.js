const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./mongodb/connect");
const usersRoutes = require("./router/usersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Users API",
    });
});

app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;