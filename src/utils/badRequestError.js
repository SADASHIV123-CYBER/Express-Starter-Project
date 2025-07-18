const AppError = require('./appError');

class BadRequestError extends AppError {
    constructor(invalidParms) {
        
        let message = "";
        invalidParms.forEach(params => {
            message += `${params}\n`
        });

        super(`The request has the following invalid parameters \n${invalidParms}`, 400);
    }
}

module.exports = BadRequestError