import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		createAnecdote(content)
		setNotification("Anecdote '" + content + "' added", 5)
	}

	return (
		<div>
			<h2>Create new anecdote</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)
