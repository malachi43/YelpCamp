const Campground = require('../models/Campground');
const connectDB = require('./../db/connectDB');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');



const images = [{
  path: 'https://res.cloudinary.com/dxsnvhloa/image/upload/v1675644791/YelpCamp/mocw4fnthup9rt5ilxpo.jpg',
  filename: 'YelpCamp/mocw4fnthup9rt5ilxpo'
},
{
  path: 'https://res.cloudinary.com/dxsnvhloa/image/upload/v1675644791/YelpCamp/si5wtnv60c3l89xbswxz.jpg',
  filename: 'YelpCamp/si5wtnv60c3l89xbswxz'
},
{
  path: 'https://res.cloudinary.com/dxsnvhloa/image/upload/v1675644791/YelpCamp/dvigiovzemkjgyua0iv1.jpg',
  filename: 'YelpCamp/dvigiovzemkjgyua0iv1'
},
{
  path: 'https://res.cloudinary.com/dxsnvhloa/image/upload/v1675644791/YelpCamp/n2sqfbxve2zbwjg7uiqn.jpg',
  filename: 'YelpCamp/n2sqfbxve2zbwjg7uiqn'
}]

const price = Math.floor(Math.random() * 100) + 10
const randomValue = (array) => array[Math.floor(Math.random() * array.length)];

(async () => {
  await connectDB();
  await Campground.deleteMany({});

  for (let i = 0; i < 50; ++i) {



    const camp = await new Campground({
      owner: `63dec1041af9841e48ceecd1`,
      location: `${randomValue(cities).city},${randomValue(cities).state}`,
      title: `${randomValue(descriptors)} ${randomValue(places)}`, price, description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non fugit odit velit repellendus odio iste, omnis ipsum tempora natus distinctio expedita corporis, delectus sint! Dolorum distinctio ipsam asperiores vero, nam fugiat cupiditate, nulla quasi possimus nostrum quaerat temporibus. Excepturi rerum amet ut similique illo sint harum suscipit aliquid soluta! Rem?
`,
      geometry: {
        type: "Point",
        coordinates: [randomValue(cities).longitude,randomValue(cities).latitude]
      }
    })
    camp.images.push({ path: randomValue(images).path, filename: randomValue(images).filename })
    await camp.save()
    console.log(camp)
  }
  console.log(`database seeded`);
})().then(() => {
  require('mongoose').connection.close()
  console.log(`DATABASE CLOSED`)
})
