const Game = require("../../mongodb/models/Game");

const createGame = async (req, res) => {
    try {
        const gameData = {
            ...req.query,
            ...req.body
        };

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