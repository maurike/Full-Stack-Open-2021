import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
	const [booksToShow, setBooksToShow] = useState([])
	const [filter, setFilter] = useState('')
	const books = useQuery(ALL_BOOKS)

	if (books.loading) {
		return <div>Result is loading...</div>
	}

	if (!props.show) {
		return null
	}

	let booksToIterate = []

	if (filter === '') {
		booksToIterate = books.data.allBooks
	} else {
		booksToIterate = booksToShow
	}

	let genreArrays = []
	books.data.allBooks.map((b) => genreArrays.push(b.genres))
	const genres = [...new Set(genreArrays.flat(1))]

	const filterBooks = (button) => {
		if (filter !== button.target.textContent) {
			let filteredBooks = []
			books.data.allBooks.map((b) =>
				b.genres.includes(button.target.textContent) ? filteredBooks.push(b) : null
			)
			setBooksToShow(filteredBooks)
			setFilter(button.target.textContent)
		}
	}

	const genreButtons = genres.map((genre) => (
		<button key={genre} onClick={filterBooks.bind(genre)}>
			{genre}
		</button>
	))

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksToIterate.map((b) => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={() => setFilter('')}>all</button>
			{genreButtons}
		</div>
	)
}

export default Books
