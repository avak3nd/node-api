const Game = require("../../mongodb/models/Game");

const getGames = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const game = await Game.findById(id);

            if (!game) {
                return res.status(404).json({
                    message: "Game not found",
                });
            }

            return res.status(200).json({
                message: "Game fetched successfully",
                game,
            });
        }

        const games = await Game.find();

        res.status(200).json({
            message: "Games fetched successfully",
            count: games.length,
            games,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get game/games",
            error: error.message,
        });
    }
};

module.exports = getGames;