const Review = require('../models/review')

module.exports.isReviewOwner = async (req, res, next) => {
    const { campgroundId, reviewId } = req.params
    const review = await Review.findById(reviewId)

    if (!review) {
        req.flash('error', ` No review with this id ${req.user._id}`)
        return res.redirect(`/campgrounds/${campgroundId}`)
    }

    if (review.owner.equals(req.user._id)) {
        return next()
    }

    req.flash('error', 'You do not have permission')
    res.redirect(`/campgrounds/${campgroundId}`)
}