const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'VERY_SECRETIVE_KEY'
let MONGODB_URI = process.env.MONGODB_URI
console.log('Connecting to', MONGODB_URI)

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.log('Error connecting to MongoDB:', error.message)
	})

const typeDefs = gql`
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}

	type Mutation {
		addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return Book.find({}).populate('author')
			}

			let author = await Author.findOne({ name: args.author })
			let allBooksInDB = await Book.find({})

			if (args.author && args.genre) {
				let filteredBooks = allBooksInDB.filter(
					(b) => b.author.toString() === author._id.toString()
				)
				return filteredBooks.filter((b) => b.genres.includes(args.genre))
			} else if (args.author) {
				return allBooksInDB.filter((b) => b.author.toString() === author._id.toString())
			}

			return allBooksInDB.filter((b) => b.genres.includes(args.genre))
		},
		allAuthors: () => {
			return Author.find({})
		},
		me: (root, args, context) => {
			return context.currentUser
		}
	},
	Author: {
		bookCount: async (root) => {
			let author = await Author.findOne({ name: root.name })
			let allBooksInDB = await Book.find({})

			return allBooksInDB.filter((book) => book.author.toString() === author._id.toString())
				.length
		}
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('Not authenticated')
			}

			let author = await Author.findOne({ name: args.author })

			if (!author) {
				const newAuthor = new Author({ name: args.author })

				try {
					await newAuthor.save()
				} catch (error) {
					throw new UserInputError(error.message, {
						invalidArgs: args
					})
				}

				const book = new Book({ ...args, author: newAuthor._id })

				try {
					await book.save()
				} catch (error) {
					throw new UserInputError(error.message, {
						invalidArgs: args
					})
				}

				return book
			} else {
				const book = new Book({ ...args, author: author._id })

				try {
					await book.save()
				} catch (error) {
					throw new UserInputError(error.message, {
						invalidArgs: args
					})
				}

				return book
			}
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError('Not authenticated')
			}

			const author = await Author.findOne({ name: args.name })

			if (!author) {
				return null
			}

			author.born = args.setBornTo

			try {
				await author.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}

			return author
		},
		createUser: (root, args) => {
			const user = new User({ username: args.username })

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new UserInputError('Wrong credentials')
			}

			const userForToken = {
				username: user.username,
				id: user._id
			}

			return { value: jwt.sign(userForToken, JWT_SECRET) }
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null

		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

			const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')
			return { currentUser }
		}
	}
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
