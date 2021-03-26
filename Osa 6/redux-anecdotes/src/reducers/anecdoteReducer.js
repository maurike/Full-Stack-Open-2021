import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_VOTE':
			const sortedAnecdotes = state.map((anecdote) =>
				anecdote.id !== action.data.id ? anecdote : action.data
			)
			return sortedAnecdotes.slice().sort((a, b) => (a.votes > b.votes ? -1 : 1))
		case 'CREATE_ANECDOTE':
			return state.concat(action.data)
		case 'INIT_ANECDOTES':
			return action.data
		default:
			return state
	}
}

export const addVote = (anecdote) => {
	return async (dispatch) => {
		const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
		const votedAnecdote = await anecdoteService.vote(changedAnecdote)
		dispatch({
			type: 'ADD_VOTE',
			data: votedAnecdote
		})
	}
}

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'CREATE_ANECDOTE',
			data: newAnecdote
		})
	}
}

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		})
	}
}

export default reducer
