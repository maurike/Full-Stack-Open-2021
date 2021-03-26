import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes)
	const filter = useSelector((state) => state.filter)
	const dispatch = useDispatch()

	const anecdoteFiltering = () => {
		return filter === ''
			? anecdotes
			: anecdotes.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
	}

	const vote = (anecdote) => {
		dispatch(addVote(anecdote))
		dispatch(setNotification("Anecdote '" + anecdote.content + "' liked", 5))
	}

	return (
		<div>
			{anecdoteFiltering().map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default AnecdoteList
