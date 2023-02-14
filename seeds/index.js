const Campground = require('../models/Campground');
const connectDB = require('./../db/connectDB');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const User = require('../models/user')

const userArray = ['63e16a5886497f3d881e633b', "63decae2b464053fc8881b0e", "63dec1041af9841e48ceecd1"]
const images = [{
  path: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60',
  filename: 'YelpCamp/mocw4fnthup9rt5ilxpo'
},
{
  path: 'https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60',
  filename: 'YelpCamp/si5wtnv60c3l89xbswxz'
},
{
  path: 'https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60',
  filename: 'YelpCamp/dvigiovzemkjgyua0iv1'
},
{
  path: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60',
  filename: 'YelpCamp/n2sqfbxve2zbwjg7uiqn'
}]

const price = Math.floor(Math.random() * 100) + 10
const randomValue = (array) => array[Math.floor(Math.random() * array.length)];

(async () => {
  await connectDB();
  await Campground.deleteMany({});

  for (let i = 0; i < 50; ++i) {
    const camp = await new Campground({
      owner: randomValue(userArray),
      location: `${randomValue(cities).city},${randomValue(cities).state}`,
      title: `${randomValue(descriptors)} ${randomValue(places)}`, price: Math.floor(Math.random() * 100) + 10, description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non fugit odit velit repellendus odio iste, omnis ipsum tempora natus distinctio expedita corporis, delectus sint! Dolorum distinctio ipsam asperiores vero, nam fugiat cupiditate, nulla quasi possimus nostrum quaerat temporibus. Excepturi rerum amet ut similique illo sint harum suscipit aliquid soluta! Rem?
`,
      geometry: {
        type: "Point",
        coordinates: [randomValue(cities).longitude, randomValue(cities).latitude]
      }
    })
    camp.images.push({ path: randomValue(images).path, filename: randomValue(images).filename })
    await camp.save()

  }
  console.log(`DATABASE SEEDED`);
})().then(() => {
  require('mongoose').connection.close()
  console.log(`DATABASE CLOSED`)
})
