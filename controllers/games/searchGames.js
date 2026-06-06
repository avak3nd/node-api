const Game = require("../../mongodb/models/Game");

const searchGames = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length < 2) {
            return res.status(200).json({
                games: [],
            });
        }

        const games = await Game.find({
            title: {
                $regex: q,
                $options: "i",
            },
        })
            .select("_id title img type")
            .limit(10);

        return res.status(200).json({
            games,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to search games",
            error: error.message,
        });
    }
};

module.exports = searchGames;