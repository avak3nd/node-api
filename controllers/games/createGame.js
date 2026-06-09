const Game = require("../../mongodb/models/Game");
const cloudinary = require("../../config/cloudinary");

const normalizeGameData = require("../../helpers/normalizeGameData");
const validateImage = require("../../helpers/validateImage");
const uploadToCloudinary = require("../../helpers/uploadToCloudinary");

const createGame = async (req, res) => {
    const uploadedPublicIds = [];

    try {
        if (!req.files?.img?.[0]) {
            return res.status(400).json({
                message: "Main image (img) is required",
            });
        }

        const gameData = normalizeGameData(req.body);

        const game = new Game(gameData);

        // Validate mongoose schema BEFORE uploading anything
        await game.validate();

        // Validate cover image
        await validateImage(
            req.files.img[0].buffer,
            1200,
            1600
        );

        const uploadedImg = await uploadToCloudinary(
            req.files.img[0].buffer,
            `${game._id}/cover`
        );

        uploadedPublicIds.push(uploadedImg.public_id);

        game.img = {
            url: uploadedImg.secure_url,
            publicId: uploadedImg.public_id,
        };

        // Optional banner image
        if (req.files?.img2?.[0]) {
            await validateImage(
                req.files.img2[0].buffer,
                2560,
                1440
            );

            const uploadedImg2 = await uploadToCloudinary(
                req.files.img2[0].buffer,
                `${game._id}/banner`
            );

            uploadedPublicIds.push(uploadedImg2.public_id);

            game.img2 = {
                url: uploadedImg2.secure_url,
                publicId: uploadedImg2.public_id,
            };
        }

        await game.save();

        return res.status(201).json({
            message: "Game created successfully",
            game,
        });
    } catch (error) {
        // Cleanup Cloudinary uploads if something failed
        if (uploadedPublicIds.length) {
            await Promise.allSettled(
                uploadedPublicIds.map((publicId) =>
                    cloudinary.uploader.destroy(publicId)
                )
            );
        }

        return res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = createGame;