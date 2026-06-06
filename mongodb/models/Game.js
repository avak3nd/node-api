const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            index: true,
        },

        img: {
            type: String,
            required: true,
        },

        img2: {
            type: String,
            default: null,
        },

        type: {
            type: String,
            default: "Base game",
        },

        sale: {
            type: Number,
            default: null,
        },

        price: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        salePrice: {
            type: Number,
            default: null,
        },

        tag: {
            type: [String],
            default: [],
            enum: [
                "new",
                "sale",
                "free",
                "new_release",
                "trending",
                "most_popular",
            ],
        },
    },
    {
        timestamps: true,
        collection: "games",
    }
);

module.exports = mongoose.model("games", gameSchema);