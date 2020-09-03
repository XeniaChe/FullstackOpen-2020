import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

const App = () => {
	const [ good, setGood ] = useState(0);
	const [ neutral, setNeutral ] = useState(0);
	const [ bad, setBad ] = useState(0);

	const goodClickHandler = () => setGood(good + 1);
	const neutralClickHandler = () => setNeutral(neutral + 1);
	const badClickHandler = () => setBad(bad + 1);
	return (
		<div>
			<h1> Give feedback</h1>
			<button onClick={goodClickHandler}>Good</button>
			<button onClick={neutralClickHandler}>Neutral</button>
			<button onClick={badClickHandler}>Bad</button>
			<h1>statistic</h1>
			<p>Good: {good}</p>
			<p>Neutral: {neutral}</p>
			<p>Bad: {bad}</p>
		</div>
	);
};
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
