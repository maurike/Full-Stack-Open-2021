import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/Persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [filteredPersons, setFilteredPersons] = useState([])
	const [message, setMessage] = useState(null)
	const [messageStatus, setMessageStatus] = useState('')

	const addPerson = (event) => {
		event.preventDefault()

		const person = {
			name: newName,
			number: newNumber
		}

		if (persons.find((p) => p.name === person.name)) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace old number with a new one?`
				)
			) {
				const personToUpdate = persons.find((p) => p.name === person.name)
				const changedPerson = { ...personToUpdate, number: newNumber }

				personService
					.update(personToUpdate.id, changedPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== personToUpdate.id ? person : returnedPerson
							)
						)

						setMessage(`${newName} has been updated`)
						setMessageStatus('success')
						setTimeout(() => {
							setMessage(null)
						}, 3000)
					})
					.catch((error) => {
						console.log('Error: ', error)
						setMessage(`${newName} has already been deleted`)
						setMessageStatus('error')
						setTimeout(() => {
							setMessage(null)
						}, 3000)
					})
			}
		} else {
			personService.create(person).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson))
			})

			setMessage(`${newName} has been added`)
			setMessageStatus('success')
			setTimeout(() => {
				setMessage(null)
			}, 3000)
		}

		setNewName('')
		setNewNumber('')
	}

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons)
		})
	}, [])

	useEffect(() => {
		setFilteredPersons(persons)
	}, [persons])

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)

		setFilteredPersons(
			persons.filter((p) => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
		)
	}

	const deletePerson = (id) => {
		const personToDelete = persons.find((p) => p.id === id).name

		if (window.confirm('Really delete ' + personToDelete + '?')) {
			personService
				.deleteId(id)
				.then((emptyPerson) => {
					setPersons(persons.filter((person) => person.id !== id))
					setMessage(`${personToDelete} has been deleted`)
					setMessageStatus('success')
					setTimeout(() => {
						setMessage(null)
					}, 3000)
				})
				.catch((error) => {
					console.log('Error: ', error)
					setMessage(`${newName} has already been deleted`)
					setMessageStatus('error')
					setTimeout(() => {
						setMessage(null)
					}, 3000)
				})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} status={messageStatus} />
			<Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

			<h2>Add new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>

			<h2>Numbers</h2>
			<Persons filteredPersons={filteredPersons} deleteButton={deletePerson} />
		</div>
	)
}

export default App
