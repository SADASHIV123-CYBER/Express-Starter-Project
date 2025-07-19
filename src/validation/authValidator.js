const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const unauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req, res, next) {
    const token = req.cookies['authToken'];
    if(!token) {
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded) {
            throw new unauthorisedError();
        }
        // reached here, then user is authenticated allow them to access the api
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }

        next();
        } catch (error) {
            return res.status(401).json({
                sucess: false,
                data: {},
                error: error,
                message: "Invalid Token provided"
            })
        }



}

// this fun checks it the authinticatd ser is ADMIN or not
// because we will call isLogin before isAdming thats why we will recive user details 
function isAdmin(req, res, next) {
    const loggedInUser = req.user
    if(loggedInUser.role == "ADMIN") {
        next();
    } else {
        return res.status(401).json({
        sucess: false,
        data: {},
        message: 'you are not authorised for this action',
        error: {
            statusCode: 401,
            reason: 'unauthorised user for this action'
        }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}