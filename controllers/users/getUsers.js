const User = require("../../mongodb/models/User");

const getUsers = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            return res.status(200).json({
                message: "User fetched successfully",
                user,
            });
        }

        const users = await User.find();

        res.status(200).json({
            message: "Users fetched successfully",
            count: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get user/users",
            error: error.message,
        });
    }
};

module.exports = getUsers;