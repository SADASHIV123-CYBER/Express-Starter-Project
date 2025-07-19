const { registerUser } = require('../services/userService');

async function createUser(req, res) {
    try {
        const response = await registerUser(req.body);
        return res.status(201).json({
            message: 'Successfully registered the user',
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        console.error("Create User Error:", error); // helpful in development
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || error.message || 'Something went wrong',
            data: {},
            error: error
        });
    }
}

module.exports = {
    createUser
};
