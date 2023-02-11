const express = require('express')
const router = express.Router({ mergeParams: true })
const { createReview, deleteReview } = require('../controllers/reviewController')
const { validateReview } = require('../middlewares/schemaValidator')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const { isReviewOwner } = require('../middlewares/isReviewOwner')
const { isDemoUser, getCurrentUrl } = require('../middlewares/isDemoUser')

router.post('/', getCurrentUrl, isDemoUser, isLoggedIn, validateReview, createReview)
router.delete('/:reviewId', getCurrentUrl, isDemoUser, isLoggedIn, isReviewOwner, deleteReview)

module.exports.router = router