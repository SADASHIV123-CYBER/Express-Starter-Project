const { createUser, findUser } = require("../repositories/userRepository");

async function registerUser(userDetails) {
    // it will create a brand new user in the db

    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });

    if(user) {
        throw { reason:  'user with the given email and mobile number already exist', statusCode: 400}
    }

    const newUser = await createUser
    ({
        email: userDetails.email,
        password: userDetails.password, 
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber
    });

    if(!newUser) {
        throw {reason: 'something went wrong, cannot create user', statusCode: 500}
    }

    return newUser;
}

module.exports = {
    registerUser
};