const {StatusCodes} = require('http-status-codes')

class Unauthorized extends Error{
    constructor(message){
        super()
        this.message = message
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports.Unauthorized = Unauthorized