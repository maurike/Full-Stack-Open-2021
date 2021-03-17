import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
	const [countries, setCountries] = useState([])
	const [newFilter, setNewFilter] = useState('')
	const [filteredCountries, setFilteredCountries] = useState([])
	const [weather, setWeather] = useState({
		main: {
			temp: 0
		},
		wind: {
			deg: 0,
			speed: 0
		},
		weather: [
			{
				icon: '02n',
				description: ''
			}
		]
	})

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
			setCountries(res.data)
		})
	}, [])

	useEffect(() => {
		setFilteredCountries(countries)
	}, [countries])

	useEffect(() => {
		const API_KEY = process.env.REACT_APP_API_KEY

		if (filteredCountries.length === 1) {
			const capital = filteredCountries.map((country) => country.capital)

			axios
				.get(
					'https://api.openweathermap.org/data/2.5/weather?q=' +
						capital[0] +
						'&appid=' +
						API_KEY +
						'&units=metric'
				)
				.then((res) => {
					setWeather(res.data)
				})
		}
	}, [filteredCountries])

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)

		setFilteredCountries(
			countries.filter((c) => c.name.toLowerCase().includes(event.target.value.toLowerCase()))
		)
	}

	const handleClick = (countryName) => {
		setNewFilter(countryName)

		setFilteredCountries(
			countries.filter((c) => c.name.toLowerCase().includes(countryName.toLowerCase()))
		)
	}

	return (
		<div>
			<Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
			<Countries
				filteredCountries={filteredCountries}
				handleClick={handleClick}
				weather={weather}
			/>
		</div>
	)
}

export default App
