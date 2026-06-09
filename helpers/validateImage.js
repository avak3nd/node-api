const sharp = require("sharp");

const validateImage = async (
    buffer,
    maxWidth,
    maxHeight
) => {
    const metadata = await sharp(buffer).metadata();

    if (metadata.format !== "webp") {
        throw new Error("Only WEBP images are allowed");
    }

    if (
        metadata.width > maxWidth ||
        metadata.height > maxHeight
    ) {
        throw new Error(
            `Maximum image size is ${maxWidth}x${maxHeight}`
        );
    }
};

module.exports = validateImage;