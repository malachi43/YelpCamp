
const {
    getAllCampgrounds,
    getSingleCampground,
    deleteCampground,
    updateCampground,
    renderCampgroundEditForm,
    renderCampgroundNewForm,
    createCampground
} = require('../controllers/campgroundsControllers')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const { isOwner } = require('../middlewares/isOwner')
const { validateCampground } = require('../middlewares/schemaValidator')
const express = require('express')
const router = express.Router({ mergeParams: true })
const multer = require('multer')
const { storage } = require('../cloudinaryConfig')
const upload = multer({ storage })
const Campground = require('../models/Campground')

router.route('/')
    .get(getAllCampgrounds)
    .post(isLoggedIn, upload.array('image'), validateCampground, createCampground)


    router.get('/images', async (req,res)=>{
        const campgrounds = await Campground.find({})
        const {images} = campgrounds[0]
        console.log('images: ', images)
        res.render('campgrounds/images',{campgrounds})
    })

    router.delete('/image/:id', (req,res)=>{
        const {id} = req.params
        console.log(id)
        res.send(`Image about to be deleted...`)
    })
router.get('/new', isLoggedIn, renderCampgroundNewForm)

router.get('/:id/edit', isLoggedIn, isOwner, renderCampgroundEditForm)

router.route('/:id')
    .get(getSingleCampground)
    .delete(isLoggedIn, isOwner, deleteCampground)
    .patch(isLoggedIn, isOwner, upload.array('image'), validateCampground, updateCampground)




module.exports.router = router