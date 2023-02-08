module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    //current url the user was before redirected to login page
    req.session.currentRoute = req.originalUrl
    req.flash('error', 'You must be logged in first')
    res.redirect('/auth/login')
}