import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value, sign }) => (
	<tr>
		<td>{text}</td>
		<td>
			{value} {sign}
		</td>
	</tr>
)

const Statistics = ({ good, neutral, bad }) => {
	if (good !== 0 || neutral !== 0 || bad !== 0) {
		return (
			<table>
				<tbody>
					<StatisticLine text='Good' value={good} />
					<StatisticLine text='Neutral' value={neutral} />
					<StatisticLine text='Bad' value={bad} />
					<StatisticLine text='All' value={good + neutral + bad} />
					<StatisticLine
						text='Average'
						value={((good - bad) / (good + neutral + bad)).toFixed(1)}
					/>
					<StatisticLine
						text='Positive'
						value={((good / (good + neutral + bad)) * 100).toFixed(1)}
						sign='%'
					/>
				</tbody>
			</table>
		)
	} else {
		return <div>No feedback given</div>
	}
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h2>
				<b>Give feedback</b>
			</h2>
			<Button handleClick={() => setGood(good + 1)} text='Good' />
			<Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
			<Button handleClick={() => setBad(bad + 1)} text='Bad' />
			<h3>
				<b>Statistics</b>
			</h3>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
