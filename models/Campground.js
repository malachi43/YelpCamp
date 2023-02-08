const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema


const imageSchema = new Schema({
    path: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true
    }

})

imageSchema.virtual('thumbnail').get(function () {
    return this.path.replace('/upload', '/upload/w_200')
})

const campgroundSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    images: [
        imageSchema
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})

campgroundSchema.post('findOneAndDelete', async function (campground) {
    if (campground) {
        await Review.deleteMany({ _id: { $in: campground.reviews } })
    }
})

module.exports = mongoose.model('Campground', campgroundSchema)