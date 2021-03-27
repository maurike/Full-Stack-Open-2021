import React from 'react'
import { filterAnecdotes } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ filterAnecdotes }) => {
	const style = {
		marginBottom: 10
	}

	return (
		<div style={style}>
			filter <input onChange={(event) => filterAnecdotes(event.target.value)} />
		</div>
	)
}

export default connect(null, { filterAnecdotes })(Filter)
