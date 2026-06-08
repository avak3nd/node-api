const Game = require("../../mongodb/models/Game");

const createGame = async (req, res) => {
    try {
        const gameData = {
            ...req.query,
            ...req.body,
        };

        const normalizeArray = (value) => {
            if (!value) return value;

            if (Array.isArray(value)) {
                return value.map((v) => v.trim()).filter(Boolean);
            }

            return value
                .split(",")
                .map((v) => v.trim())
                .filter(Boolean);
        };

        if (gameData.tag) {
            gameData.tag = normalizeArray(gameData.tag);
        }

        if (gameData.badge) {
            gameData.badge = normalizeArray(gameData.badge);
        }

        if (gameData.comment) {
            gameData.comment = normalizeArray(gameData.comment);
        }

        const game = await Game.create(gameData);

        res.status(201).json({
            message: "Game created successfully",
            game,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create game",
            error: error.message,
        });
    }
};

module.exports = createGame;