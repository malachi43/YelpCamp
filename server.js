// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

require('dotenv').config()
const helmet = require('helmet')
const cors = require('cors')
require('express-async-errors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
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
const mongoSanitize = require('express-mongo-sanitize')
const aWeek = 1000 * 60 * 60 * 24 * 7
const dbUrl = `mongodb://127.0.0.1:27017/YelpCamp`

const sessionConfig = {
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: true,
        expires: Date.now() + aWeek,
        maxAge: aWeek
    },
    store: MongoStore.create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 3600// time period in seconds,
    })
}
const PORT = 3000 || process.env.PORT;

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(require('morgan')('tiny'))


// app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(mongoSanitize())
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
    console.log(req.query)
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

//Campground HomePage
app.get('/', (req, res) => {
    res.status(200).render('campgrounds/home');
})

app.get('/yelpcamp/demo-user', async (req, res) => {
    //check if demoUser exists
    const foundUser = await User.findOne({ username: 'DemoUser' })
    if (foundUser) {
        req.login(foundUser, function (err) {
            if (err) throw new Error(`Error establishing session`)
            req.flash('success', 'Welcome :) to Yelp Camp')
            res.redirect('/campgrounds')
        })
        return
    }

    //create a DemoUser 
    const user = await new User({ username: 'DemoUser', email: 'demouser@gmail.com' })
    const demoUser = await User.register(user, process.env.DEMO_PASSWORD)
    req.login(demoUser, function (err) {
        if (err) throw new Error(`Error establishing session`)
        req.flash('success', 'Welcome :) to Yelp Camp')
        res.redirect('/campgrounds')
    })
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


// <div class="row my-3 ">
//   <div class="col-md-4 d-none d-lg-block" >
//     <img src="<%= campground.images.length ? campground.images[0].path : 'https://res.cloudinary.com/dxsnvhloa/image/upload/v1675724425/YelpCamp/nxpmbqc2ubecyf3iqxls.jpg' %>"
//       class="img-fluid rounded"
//       alt=""
//     />
//   </div>