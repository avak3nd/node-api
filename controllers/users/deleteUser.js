const User = require("../../mongodb/models/User");

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete user",
            error: error.message,
        });
    }
};

module.exports = deleteUser;