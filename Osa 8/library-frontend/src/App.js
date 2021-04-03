import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	const updateCacheWith = (addedBook) => {
		const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

		const dataInStore = client.readQuery({ query: ALL_BOOKS })

		if (!includedIn(dataInStore.allBooks, addedBook)) {
			client.writeQuery({
				query: ALL_BOOKS,
				data: { allBooks: dataInStore.allBooks.concat(addedBook) }
			})
		}
	}

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			console.log(subscriptionData)
			updateCacheWith(addedBook)
		}
	})

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	if (!token) {
		return (
			<div>
				<h2>Login</h2>
				<LoginForm setToken={setToken} />
			</div>
		)
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>Authors</button>
				<button onClick={() => setPage('books')}>Books</button>
				<button onClick={() => setPage('add')}>Add book</button>
				<button onClick={logout}>Logout</button>
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} />
		</div>
	)
}

export default App
