const express = require('express')
const router = express.Router({ mergeParams: true })
const passport = require('passport')
const {
    renderRegisterForm,
    renderLoginForm,
    registerUser,
    loginUser,
    logoutUser } = require('../controllers/authController')

router.route('/register')
    .get(renderRegisterForm)
    .post(registerUser)

router.route('/login')
    .get(renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/auth/login', keepSessionInfo: true }), loginUser)

router.get('/logout', logoutUser)

module.exports = router