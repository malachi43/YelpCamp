const {StatusCodes} = require('http-status-codes')

class NotFound extends Error{
    constructor(message){
        super()
        this.message = message
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports.NotFound = NotFound