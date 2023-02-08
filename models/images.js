const mongoose = require('mongoose')

const {Schema} = mongoose

const imageSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('Image', imageSchema)