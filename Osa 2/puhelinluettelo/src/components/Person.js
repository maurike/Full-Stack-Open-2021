import React from 'react'

const Person = ({ name, number, deleteButton }) => {
	return (
		<div>
			{name} {number} <button onClick={deleteButton}>Delete</button>
		</div>
	)
}

export default Person
