const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('person', function (req, res) {
	if (req.method === 'POST') {
		return JSON.stringify(req.body)
	} else {
		return null
	}
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456'
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523'
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345'
	},
	{
		id: 4,
		name: 'Mary Poppendick',
		number: '39-23-6423122'
	}
]

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/api/info', (req, res) => {
	res.send('Phonebook has info for ' + persons.length + ' people<br/><br/>' + new Date())
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find((person) => person.id === id)
	person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter((person) => person.id !== id)
	res.status(204).end()
})

app.post('/api/persons', (req, res) => {
	const body = req.body

	if (!body.name) {
		return res.status(400).json({
			error: 'Name is missing'
		})
	} else if (!body.number) {
		return res.status(400).json({
			error: 'Number is missing'
		})
	} else if (persons.find((p) => p.name === body.name)) {
		return res.status(400).json({
			error: 'Name is already in phonebook'
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: Math.floor(Math.random() * (10000 - 1) + 1)
	}

	persons = persons.concat(person)
	res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
