const mongoose = require('mongoose')
const connectionString = process.env.MONGO_URL


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