const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	let blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
	const promiseArray = blogObjects.map((blog) => blog.save())
	await Promise.all(promiseArray)
})

describe('4.8 - Blog api tests', () => {
	test('Right amount of blogs returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(6)
	})

	test('Blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
})

describe('4.9 - Blog id test', () => {
	test('Blog identifiable field is id', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[0].id).toBeDefined()
	})
})

describe('4.10 - Add blog test', () => {
	test('Can add blog', async () => {
		const newBlog = {
			title: 'Test Title',
			url: 'http://test.url'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const blogTitles = blogsAtEnd.map((blog) => blog.title)
		expect(blogTitles).toContainEqual('Test Title')
	})
})

describe('4.11 - Default amount of likes is 0', () => {
	test('Amount of likes is 0', async () => {
		const blogWithNoLikes = {
			title: 'Test Title',
			url: 'http://test.url'
		}

		await api.post('/api/blogs').send(blogWithNoLikes)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd.find((blog) => blog.title === 'Test Title').likes).toEqual(0)
	})
})

describe('4.12 - New blog must contain title and url', () => {
	test('Status 400 if no title', async () => {
		const blogWithNoTitle = {
			url: 'http://test.url'
		}

		await api.post('/api/blogs').send(blogWithNoTitle).expect(400)
	})

	test('Status 400 if no url', async () => {
		const blogWithNoUrl = {
			title: 'Test Title'
		}

		await api.post('/api/blogs').send(blogWithNoUrl).expect(400)
	})
})

describe('4.13 - Blogs can be deleted', () => {
	test('Status 204 if blog deleted', async () => {
		const blogsAtStart = await helper.blogsInDb()

		await api.delete(`/api/blogs/${blogsAtStart[0].id}`).expect(204)
	})

	test('Can delete blog', async () => {
		const blogsAtStart = await helper.blogsInDb()

		await api.delete(`/api/blogs/${blogsAtStart[0].id}`)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

		const titles = blogsAtEnd.map((blog) => blog.title)
		expect(titles).not.toContainEqual(blogsAtStart[0].title)
	})
})

describe('4.14 - Blogs can be modified', () => {
	test('First blog now has 20 likes', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blogWith20Likes = {
			likes: 20
		}

		await api.put(`/api/blogs/${blogsAtStart[0].id}`).send(blogWith20Likes)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd[0].likes).toEqual(20)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
