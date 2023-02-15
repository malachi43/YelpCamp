const Campground = require('../models/Campground')
const CustomError = require('../errors');
const { cloudinary } = require('../cloudinaryConfig')
const mapboxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mbxGeo = mapboxGeoCoding({ accessToken: process.env.MAPBOX_TOKEN })

module.exports.getAllCampgrounds = async (req, res) => {

    const queryObject = {}
    //check if req.query object has a property
    // if (!req.query.view) {
    //     res.locals.view = 'grid'
    //     res.locals.grid = 'col-md-6'
    // }

    // //check if req.query object has a property equal to list
    // if (req.query.view && req.query.view === 'list') {
    //     res.locals.view = 'list'
    //     res.locals.list = 'col-12'
    // }

    // //check if req.query object has a property equal to grid
    // if (req.query.view && req.query.view === 'grid') {
    //     res.locals.view = 'grid'
    //     res.locals.grid = 'col-md-6'
    // }

    if (req.query.q) {
        queryObject.title = { $regex: req.query.q, $options: 'i' }
    }

    const campgrounds = Campground.find(queryObject)


    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 6
    const skip = (page - 1) * limit

    const numberOfPages = Math.ceil(await Campground.countDocuments() / limit)
    res.locals.numberOfPages = numberOfPages
    const campgroundResults = await campgrounds.skip(skip).limit(limit)
    // res.redirect(req.query.view ? req.originalUrl : '/campgrounds')
    res.render('campgrounds/index', { campgrounds: campgroundResults });
}

module.exports.updateCampground = async (req, res) => {

    const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground }, { runValidators: true, new: true })


    if (req.files) {
        const images = req.files.map(file => ({ path: file.path, filename: file.filename }))
        campground.images.push(...images)
    }
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        //delete images where the filename in req.body.deleteImages is in the images array.
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }

    await campground.save()
    req.flash('success', 'update was successful')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.getSingleCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
        .populate({ path: 'reviews', populate: { path: 'owner' } })
        .populate({ path: 'owner' })
    // if (!campground) throw new CustomError.NotFound(`No campground with id: ${req.params.id}.`)
    if (!campground) {
        req.flash('error', 'cannot find the requested campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground });
}

module.exports.createCampground = async (req, res) => {
    const { body: { features } } = await mbxGeo.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()

    if (features.length === 0) {
        req.flash('error', `Error reading ${req.body.campground.location} location`)
        return res.redirect('/campgrounds/new')
    }
    const geometry = features[0].geometry

    const images = req.files.map(file => {
        return {
            path: file.path,
            filename: file.filename
        }
    })
    const newCampground = new Campground(req.body.campground)
    newCampground.owner = req.user._id
    newCampground.images = images
    newCampground.geometry = geometry
    await newCampground.save()
    req.flash('success', 'successfully made a campground')
    res.status(200).redirect(`/campgrounds/${newCampground._id}`)
}

module.exports.renderCampgroundNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.renderCampgroundEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    // if (!campground) throw new CustomError.NotFound(`No campground with id: ${req.params.id}.`)

    res.render('campgrounds/edit', { campground })
}


module.exports.deleteCampground = async (req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id)
    req.flash('success', 'successfully deleted campground')
    res.redirect('/campgrounds')
}
