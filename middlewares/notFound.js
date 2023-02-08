

module.exports.notFound = (req, res) => {
    res.render('pageNotFound', {errorCode: 404, err: `The requested resource cannot be found`})
}