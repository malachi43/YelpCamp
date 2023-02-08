if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
require('express-async-errors')
const session = require('express-session')
const flash = require('connect-flash')
const express = require('express');
const app = express();
const passport = require('passport')
const User = require('./models/user')
const LocalStrategy = require('passport-local')
const { router: campgroundRoutes } = require('./routes/campgroudRoutes')
const { router: reviewRoutes } = require('./routes/reviewRoutes')
const userRoutes = require('./routes/authRoutes')
const { errorHandler } = require('./middlewares/errorHandler')
const { notFound } = require('./middlewares/notFound')
const connectDB = require('./db/connectDB');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const { join } = require('path');
const aWeek = 1000 * 60 * 60 * 24 * 7

const sessionConfig = {
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + aWeek,
        maxAge: aWeek
    }
}

const PORT = 3000 || process.env.PORT;

//483251
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(require('morgan')('tiny'))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(join(__dirname, 'public')))
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

//Campground HomePage
app.get('/', (req, res) => {
    res.status(200).render('campgrounds/home');
})

//middlewares
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:campgroundId/reviews', reviewRoutes)
app.use('/auth', userRoutes)

app.use(notFound)
app.use(errorHandler)


//For Handling async errors in express.
// function asyncErrorWrapper(fns) {
//     return async (req, res, next) => {
//         try {
//             await fns(req, res, next)
//         } catch (error) {
//             next(error)
//         }
//     }
// }






















async function startApp() {
    await connectDB();
    console.log(`CONNECTED TO DATABASE`)
    app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT ${PORT}`));
}

startApp();