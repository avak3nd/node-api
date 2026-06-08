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
            required: true,
            enum: [
                "new",
                "sale",
                "free",
                "new_release",
                "trending",
                "most_popular",
            ],
            validate: {
                validator: function (value) {
                    return Array.isArray(value) && value.length > 0;
                },
                message: "At least one tag is required",
            },
        },

        badge: {
            type: [String],
            required: true,
            default: undefined, 
        },

        rank: {
            type: Number,
            default: null,
        },

        comment: {
            type: [String],
            required: true,
            default: undefined,
            enum: [
                "Great for Beginners",
                "Beautiful Visuals",
                "Highly Recommended",
                "Amazing Characters",
                "Diverse Characters",
                "Amazing Storytelling",
            ],
        },
    },
    {
        timestamps: true,
        collection: "games",
    }
);

module.exports = mongoose.model("games", gameSchema);