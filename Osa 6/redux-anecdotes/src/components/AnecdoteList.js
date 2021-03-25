import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes)
	const filter = useSelector((state) => state.filter)
	const dispatch = useDispatch()

	const anecdoteFiltering = () => {
		return filter === ''
			? anecdotes
			: anecdotes.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
	}

	const vote = (id) => {
		dispatch(addVote(id))
		dispatch(
			showNotificationWithTimeout(
				'vote',
				anecdotes.find((a) => a.id === id)
			)
		)
	}

	return (
		<div>
			{anecdoteFiltering().map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default AnecdoteList
