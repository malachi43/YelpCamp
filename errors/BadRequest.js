const {StatusCodes} = require('http-status-codes')

class BadRequest extends Error{
    constructor(message){
        super()
        this.message = message
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports.BadRequest = BadRequest