import React from 'react'
import Person from './Person'

const Persons = ({ filteredPersons, deleteButton }) => {
	return filteredPersons.map((person) => (
		<Person
			key={person.name}
			name={person.name}
			number={person.number}
			deleteButton={() => deleteButton(person.id)}
		/>
	))
}

export default Persons
