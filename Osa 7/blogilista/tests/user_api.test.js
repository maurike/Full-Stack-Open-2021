const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('4.16 - Invalid users cannot be created', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('password', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('User creation succeeds', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'Test User',
			name: 'Test Name',
			password: 'password'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map((user) => user.username)
		expect(usernames).toContainEqual(newUser.username)
	})

	test('User creation fails if username taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('Username must be 3 characters or longer', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'te',
			name: 'name',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` (`te`) is shorter than')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

    test('Password must be 3 characters or longer', async () => {
        const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'Test Username',
			name: 'name',
			password: 'pa'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('Password too short')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Username must be present', async () => {
        const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'name',
			password: 'password'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` is required')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Password must be present', async () => {
        const usersAtStart = await helper.usersInDb()

		const newUser = {
            username: 'Test Username',
			name: 'st'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('Password is required')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
	mongoose.connection.close()
})
