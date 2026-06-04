const Game = require("../../mongodb/models/Game");

const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;

        const game = await Game.findByIdAndDelete(id);

        if (!game) {
            return res.status(404).json({
                message: "Game not found",
            });
        }

        res.status(200).json({
            message: "Game deleted successfully",
            game,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete game",
            error: error.message,
        });
    }
};

module.exports = deleteGame;