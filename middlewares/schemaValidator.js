const Joi = require('joi')
const CustomError = require('../errors')
const { campgroundSchema, reviewSchema } = require('../utils/payloadValidator')

//Validates the req.body of the campground sent by a post request.
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)

    if (error) {
        const errorMsg = error.details.map(item => item.message).join(',')
        throw new CustomError.BadRequest(errorMsg)
    }

    next()
}

module.exports.validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body)

    if(error){
        const errorMsg = error.details.map(item => item.message).join(',')
        throw new CustomError.BadRequest(errorMsg)
    }

    next()
}