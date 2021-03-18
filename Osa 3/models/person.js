const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('Connecting to', url)

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		console.log('Connection successful')
	})
	.catch((error) => {
		console.log('Connection failed', error.message)
	})

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)
