const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async (url) => {
    return mongoose.connect(url, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // mongoose.connection.on('error', () => console.log(`ERROR CONNECTING TO DATABASE`))

    // mongoose.connection.once('open', () => console.log(`CONNECTED TO DATABASE`))
}

module.exports = connectDB