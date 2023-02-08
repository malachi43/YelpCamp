const Campground = require('../models/Campground')

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'cannot find the requested campground')
        return res.redirect('/campgrounds')
    }
    if (!campground.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permissions')
        return res.redirect(`/campgrounds/${campground._id}`)
    }
    next()
}