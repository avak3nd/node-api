const Game = require("../../mongodb/models/Game");
const cloudinary = require("../../config/cloudinary");

const normalizeGameData = require("../../helpers/normalizeGameData");
const validateImage = require("../../helpers/validateImage");
const uploadToCloudinary = require("../../helpers/uploadToCloudinary");

const updateGame = async (req, res) => {
    try {
        const game = await Game.findById(
            req.params.id
        );

        if (!game) {
            return res.status(404).json({
                message: "Game not found",
            });
        }

        const gameData =
            normalizeGameData(req.body);

        if (req.files?.img?.[0]) {
            await validateImage(
                req.files.img[0].buffer,
                1200,
                1600
            );

            await cloudinary.uploader.destroy(
                `${game._id}/cover`
            );

            const uploaded =
                await uploadToCloudinary(
                    req.files.img[0].buffer,
                    `${game._id}/cover`
                );

            gameData.img = {
                url: uploaded.secure_url,
                publicId: uploaded.public_id,
            };
        }

        if (req.files?.img2?.[0]) {
            await validateImage(
                req.files.img2[0].buffer,
                2560,
                1440
            );

            await cloudinary.uploader.destroy(
                `${game._id}/banner`
            );

            const uploaded =
                await uploadToCloudinary(
                    req.files.img2[0].buffer,
                    `${game._id}/banner`
                );

            gameData.img2 = {
                url: uploaded.secure_url,
                publicId: uploaded.public_id,
            };
        }

        const updatedGame =
            await Game.findByIdAndUpdate(
                game._id,
                gameData,
                {
                    new: true,
                    runValidators: true,
                }
            );

        res.status(200).json({
            message: "Game updated successfully",
            game: updatedGame,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update game",
            error: error.message,
        });
    }
};

module.exports = updateGame;