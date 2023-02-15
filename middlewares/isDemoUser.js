
module.exports.isDemoUser = (req, res, next) => {
    if (req.user.username === process.env.DEMO_USER) {
        req.flash('error', 'permission denied, you are a demo user')
        return res.redirect(req.session.returnTo || `/campgrounds`)
    }
    next()
}

module.exports.getCurrentUrl = (req, res, next) => {
    if (req.user.username === process.env.DEMO_USER) {
        if (req.originalUrl.includes('reviews')) {
            const pathArray = req.originalUrl.split('/')
            //the campground Id gotten from the pathArray by splitting the req.originalUrl(this forms an array)
            const campId = pathArray[2]
            req.session.returnTo = `/campgrounds/${campId}`
            return next()
        }
    }
    req.session.returnTo = req.originalUrl
    next()
}