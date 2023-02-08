const express = require('express')
const router = express.Router({ mergeParams: true })
const { createReview, deleteReview } = require('../controllers/reviewController')
const { validateReview } = require('../middlewares/schemaValidator')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const { isReviewOwner } = require('../middlewares/isReviewOwner')

router.post('/', isLoggedIn, validateReview, createReview)
router.delete('/:reviewId', isLoggedIn, isReviewOwner, deleteReview)

module.exports.router = router