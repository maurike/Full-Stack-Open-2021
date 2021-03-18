const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstack:${password}@cluster0-shard-00-00.wkepl.mongodb.net:27017,cluster0-shard-00-01.wkepl.mongodb.net:27017,cluster0-shard-00-02.wkepl.mongodb.net:27017/phonebook-app?ssl=true&replicaSet=atlas-jja5n4-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connection successful')
  })
  .catch((error) => {
    console.log('Connection failed', error)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
} else {
  person.save().then(() => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    )
    mongoose.connection.close()
  })
}
