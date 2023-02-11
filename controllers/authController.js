const User = require('../models/user')

module.exports.renderLoginForm = (req, res) => {
    res.render('user/login')
}

module.exports.renderRegisterForm = (req, res) => {
    res.render('user/register')
}

module.exports.registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body.user
        const user = await new User({ username, email })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, function (err) {
            if (err) throw new Error(`Error establishing login session`)
            req.flash('success', 'Welcome :) to Yelp Camp')
            res.redirect('/campgrounds')
        })

    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/auth/register')
    }
}

module.exports.loginUser = (req, res) => {

    //Gets the current url of the user before redirected to login
    const { currentRoute } = req.session

    delete req.session.currentRoute
    const partName = req.body.username.slice(1)
    const name = req.body.username.charAt(0).toUpperCase() + partName
    req.flash('success', `Welcome, ${name}`)
    res.redirect(currentRoute || '/campgrounds')
}


module.exports.logoutUser = (req, res) => {

    req.logout((err) => {
        if (err) throw new Error()
        req.flash('success', 'Goodbye')
        res.redirect('/campgrounds')

    })

}