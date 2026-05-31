const User = require("../../mongodb/models/User");

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update user",
            error: error.message,
        });
    }
};

module.exports = updateUser;