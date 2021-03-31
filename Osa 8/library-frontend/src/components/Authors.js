import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`

const Authors = (props) => {
	const [name, setName] = useState('')
	const [setBornTo, setBorn] = useState('')

	const authors = useQuery(ALL_AUTHORS)
	const [changeAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }]
	})

	let options = []

	if (authors.loading) {
		return <div>Result is loading...</div>
	} else {
		options = authors.data.allAuthors.map((a) => {
			return {
				value: a.name,
				label: a.name
			}
		})
	}

	if (!props.show) {
		return null
	}

	const submit = async (event) => {
		event.preventDefault()

		changeAuthor({ variables: { name, setBornTo } })

		setName('')
		setBorn('')
	}

	return (
		<div>
			<h2>Authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>Born</th>
						<th>Books</th>
					</tr>
					{authors.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<h3>Set birth year</h3>
			<form onSubmit={submit}>
				<Select
					defaultValue={name}
					onChange={({ value }) => setName(value)}
					options={options}
				/>
				<div>
					Born:
					<input value={setBornTo} onChange={({ target }) => setBorn(+target.value)} />
				</div>
				<button type='submit'>Update author</button>
			</form>
		</div>
	)
}

export default Authors
