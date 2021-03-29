const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method)
	logger.info('Path:  ', req.path)
	logger.info('Body:  ', req.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'Malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'Invalid token' })
	} else if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'Token expired' })
	}

	next(error)
}

const tokenExtractor = (req, res, next) => {
	const auth = req.get('authorization')

	if (auth && auth.toLowerCase().startsWith('bearer ')) {
		req.token = auth.substring(7)
	} else {
		req.token = null
	}

	next()
	return req.token
}

const userExtractor = async (req, res, next) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET)

	if (!decodedToken || !decodedToken.id) {
		return res.status(401).json({ error: 'Token missing or invalid' })
	}

	req.user = await User.findById(decodedToken.id)

	next()
	return req.user
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}
