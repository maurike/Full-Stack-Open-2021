import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = ({ anecdotes }) => {
	const points = [0, 0, 0, 0, 0, 0]
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(points)
	const [mostVotes, setMostVotes] = useState(0)

	const vote = (selected) => {
		const copy = [...votes]
		copy[selected] += 1
		setVotes(copy)
		mostVoted(copy)
	}

	const mostVoted = (votes) => {
		for (const [index, value] of votes.entries()) {
			if (value > votes[mostVotes]) {
				setMostVotes(index)
			}
		}
	}

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<div>{anecdotes[selected]}</div>
			<p>has {votes[selected]} votes</p>
			<Button handleClick={() => vote(selected)} text='Vote' />
			<Button
				handleClick={() => setSelected(Math.floor(Math.random() * 6))}
				text='Next anecdote'
			/>
			<h2>Anecdote with most votes</h2>
			<div>{anecdotes[mostVotes]}</div>
			<p>has {votes[mostVotes]} votes</p>
		</div>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
