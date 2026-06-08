const Game = require("../../mongodb/models/Game");
const normalizeGameData = require("../../helpers/normalizeGameData");

const updateGame = async (req, res) => {
    try {
        const { id } = req.params;

        const gameData = normalizeGameData({
            ...req.query,
            ...req.body,
        });

        const game = await Game.findByIdAndUpdate(id, gameData, {
            new: true,
            runValidators: true,
        });

        if (!game) {
            return res.status(404).json({
                message: "Game not found",
            });
        }

        res.status(200).json({
            message: "Game updated successfully",
            game,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update game",
            error: error.message,
        });
    }
};

module.exports = updateGame;