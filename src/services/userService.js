class UserService {

    constructor(_userRepository) {
        this.userRepository = _userRepository;
    }
    async registerUser(userDetails) {
        // it will create a brand new user in the db

        const user = await this.userRepository.findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });

        if(user) {
            throw { reason:  'user with the given email and mobile number already exist', statusCode: 400}
        }

        const newUser = await this.userRepository.createUser({
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
}

module.exports = UserService;