

module.exports.errorHandler = (err, req, res, next) => {
    const errorObj = {
        errorCode: err.statusCode || 500,
        message: err || `Something went wrong try again later`
    }
    res.status(errorObj.errorCode).render('error', { err: errorObj.message, errorCode: errorObj.errorCode })
}