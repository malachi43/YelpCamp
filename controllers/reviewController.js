const Campground = require('../models/Campground')
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const { campgroundId } = req.params
    const campground = await Campground.findById(campgroundId)
    const review = new Review({ ...req.body.review, owner: req.user._id }).populate('owner')
    await review.save()
    campground.reviews.push(review)
    await campground.save()
    req.flash('success', 'new review created')
    res.redirect(`/campgrounds/${campgroundId}`)
}

module.exports.deleteReview = async (req, res) => {
    const { campgroundId, reviewId } = req.params
    //remove from reviews array where reviewId is equals to the destructured reviewId
    await Campground.findByIdAndUpdate(campgroundId, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'review deleted')
    res.redirect(`/campgrounds/${campgroundId}`)
}
