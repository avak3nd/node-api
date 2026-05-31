const User = require("../../mongodb/models/User");

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create user",
            error: error.message,
        });
    }
};

module.exports = createUser;