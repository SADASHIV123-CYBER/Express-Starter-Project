const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password

    // 1. Check if there is a registered user with the give email

    const user = await findUser({email});
    console.log("db user found" , user);
    

    if(!user) {
        throw {message: "no user found with the given email", statusCode: 404}
    }

    // 2. if the use is find we need to compair plainIncomingPassword with hashedpass

    const isPasswordValidated  = await bcrypt.compare(plainPassword, user.password);

    if(!isPasswordValidated) {
        throw {message: "Invalid password, please try again", statusCode: 401};
    }

    // 3. it the password is validated, create a token and return it

    const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    });

    return token;
}

module.exports = {
    loginUser
}