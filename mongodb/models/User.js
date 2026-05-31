const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        age: {
            type: Number,
            default: null,
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

module.exports = mongoose.model("User", userSchema);