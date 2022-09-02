const mongoose = require('mongoose')
const Campsite = require('./models/campsite')

const url = 'mongodb://localhost:27017/nucampsite'
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

connect.then(() => {

  console.log('Connected correctly to server')

  // this creates the new collection, saves it and returns a promise
  Campsite.create({
    name: 'React Lake Campground',
    description: 'test'
  })

  /*
    promise chaining: operations will occur in sequence
    any errors caught at bottom catch
  */
  .then(campsite => {
    console.log(campsite)

    return Campsite.findByIdAndUpdate(campsite._id, {
      $set: { description: 'Updated Test Document' }
    }, {
      // this ensures the updated document is returned:
      new: true
    })
  })
  .then(campsite => {
    console.log(campsite)

    campsite.comments.push({
      rating: 5,
      text: 'What a magnificent view!',
      author: 'Tinus Lorvaldes'
    })

    return campsite.save()
  })
  .then(campsite => {
    console.log(campsite)
    return Campsite.deleteMany()
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
    mongoose.connection.close()
  })
})