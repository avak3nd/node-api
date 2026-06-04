const Game = require("../../mongodb/models/Game");

const VALID_TAGS = [
    "new",
    "sale",
    "free",
    "new_release",
    "trending",
    "most_popular",
];

const getGames = async (req, res) => {
    try {
        const { id, tag } = req.params;

        // GET /api/games/:id
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

        // GET /api/games/tag/:tag
        if (tag) {
            if (!VALID_TAGS.includes(tag)) {
                return res.status(400).json({
                    message: "Invalid tag",
                });
            }

            const games = await Game.find({
                tag: tag,
            });

            return res.status(200).json({
                message: `${tag} games fetched successfully`,
                count: games.length,
                games,
            });
        }

        // GET /api/games
        const games = await Game.find();

        return res.status(200).json({
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