const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	blog ? res.json(blog.toJSON()) : res.status(404).end()
})

blogRouter.post('/', async (req, res) => {
	const body = req.body
	const user = req.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	res.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (req, res) => {
	const user = req.user
	const blog = await Blog.findById(req.params.id)

	if (blog.user.toString() === user._id.toString()) {
		await Blog.findByIdAndRemove(req.params.id)
		res.status(204).end()
	} else {
		res.status(400).json({ error: 'User is not blog creator' })
	}
})

blogRouter.put('/:id', async (req, res) => {
	const body = req.body
	const blog = {}

	for (let prop in body) {
		if (body[prop]) {
			blog[prop] = body[prop]
		}
	}

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
	res.json(updatedBlog.toJSON())
})

module.exports = blogRouter
