const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer, publicId) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "games",
                public_id: publicId,
                overwrite: true,
                resource_type: "image",
                format: "webp",
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        streamifier
            .createReadStream(buffer)
            .pipe(stream);
    });

module.exports = uploadToCloudinary;