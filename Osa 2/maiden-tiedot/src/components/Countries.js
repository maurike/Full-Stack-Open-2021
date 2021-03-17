import React from 'react'
import CountryList from './CountryList'
import CountryDetail from './CountryDetail'

const Countries = ({ filteredCountries, handleClick, weather }) => {
	if (filteredCountries.length === 1) {
		return filteredCountries.map((country) => (
			<CountryDetail key={country.name} country={country} weather={weather} />
		))
	} else if (filteredCountries.length <= 10) {
		return filteredCountries.map((country) => (
			<CountryList key={country.name} country={country} handleClick={handleClick} />
		))
	}
	return <div>Too many matches, specify another filter</div>
}

export default Countries
