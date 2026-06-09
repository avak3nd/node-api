const Game = require("../../mongodb/models/Game");
const cloudinary = require("../../config/cloudinary");

const deleteGame = async (req, res) => {
    try {
        const game = await Game.findById(
            req.params.id
        );

        if (!game) {
            return res.status(404).json({
                message: "Game not found",
            });
        }

        await cloudinary.uploader.destroy(
            `${game._id}/cover`
        );

        await cloudinary.uploader.destroy(
            `${game._id}/banner`
        );

        await game.deleteOne();

        res.status(200).json({
            message:
                "Game deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = deleteGame;