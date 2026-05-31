const User = require("../../mongodb/models/User");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            message: "Users fetched successfully",
            count: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get users",
            error: error.message,
        });
    }
};

module.exports = getUsers;