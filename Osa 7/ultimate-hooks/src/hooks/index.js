import { useEffect, useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}

export const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])

	const getAll = () => {
		axios.get(baseUrl).then((res) => setResources(res.data))
	}

	const create = (resource) => {
		axios.post(baseUrl, resource).then((res) => [...resources, res.data])
	}

	const service = {
		create,
		getAll
	}

	return [resources, service]
}
