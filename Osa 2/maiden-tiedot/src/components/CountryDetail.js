import React from 'react'
import WeatherData from './WeatherData'

const CountryDetail = ({ country, weather }) => {
	return (
		<div>
			<h1>
				<b>{country.name}</b>
			</h1>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<h2>Languages</h2>
			<ul>
				{country.languages.map((language) => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>
			<img src={country.flag} alt={country.name} height='150px' />
			<WeatherData weather={weather} />
		</div>
	)
}

export default CountryDetail
