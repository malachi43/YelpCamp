

module.exports.errorHandler = (err, req, res, next) => {
    // res.status(err.statusCode || 500).send(`
    // <h1 style="text-align: center; font-size: 7em; margin-top: 2em">ERROR!!!</h1>
    // <p style="text-align: center; margin-top: 1.5em; font-size: 5em">${err.message}</p>
    // ` || `Something went wrong, try again later`)
    const errorObj = {
        errorCode: err.statusCode || 500,
        message: err.stack || `Something went wrong try again later`
    }
    res.status(errorObj.errorCode).render('error', { err: errorObj.message, errorCode: errorObj.errorCode })
}