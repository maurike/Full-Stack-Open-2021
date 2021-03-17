import React from 'react'

const WeatherData = ({ weather }) => {
	return (
		<div>
			<h2>Weather in {weather.name}</h2>
			<p>
				<b>Temperature: </b>
				{weather.main.temp} Celsius
			</p>
			<img
				src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
				alt={weather.weather[0].description}
			/>
			<p>
				<b>Wind: </b>
				{weather.wind.speed} m/sec, direction {weather.wind.deg} degrees
			</p>
		</div>
	)
}

export default WeatherData
