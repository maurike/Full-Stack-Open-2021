import { useEffect, useState } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
	const [country, setCountry] = useState(null)

	useEffect(() => {
		if (name !== '') {
			axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`).then(
				(res) => {
					const data = res.data[0]
					const found = true
					setCountry({ data, found })
				},
				() => {
					console.log('error')
				}
			)
		}
	}, [name])

	return country
}
