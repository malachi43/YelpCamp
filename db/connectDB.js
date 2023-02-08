const mongoose = require('mongoose')
const connectionString = `mongodb://127.0.0.1:27017/YelpCamp`


const connectDB = async () => {
    return mongoose.connect(connectionString, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // mongoose.connection.on('error', () => console.log(`ERROR CONNECTING TO DATABASE`))

    // mongoose.connection.once('open', () => console.log(`CONNECTED TO DATABASE`))
}

module.exports = connectDB