import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducers/reducer'

const store = createStore(reducer)

const App = () => {
	return (
		<div>
			<button onClick={e => store.dispatch({type: 'GOOD'})}>Good</button>
			<button onClick={e => store.dispatch({type: 'OK'})}>Ok</button>
			<button onClick={e => store.dispatch({type: 'BAD'})}>Bad</button>
			<button onClick={e => store.dispatch({type: 'RESET'})}>Reset</button>
			<div>Good: {store.getState().good}</div>
			<div>Ok: {store.getState().ok}</div>
			<div>Bad: {store.getState().bad}</div>
		</div>
	)
}

const renderApp = () => {
	ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
